CREATE OR REPLACE FUNCTION generate_random_sales(
    start_date DATE,
    end_date DATE
)
RETURNS VOID AS $$
DECLARE
    sale_date DATE;
    num_sales INTEGER;
    i INTEGER;
    product_sku VARCHAR(20);
    quantity INTEGER;
    price NUMERIC;
    total NUMERIC;
    customer BOOLEAN;
    customer_id UUID;
    employee_id UUID;
    store_id UUID;
    transaction_id UUID;
    inventory_level INTEGER;
    restock_quantity INTEGER := 50; -- Assuming a restock quantity of 50 units
    restock_threshold INTEGER := 10; -- Restock if inventory falls below this level
    supplier_id UUID;
    tax_rate NUMERIC := 0.05; -- Assuming a tax rate of 5%
    order_date DATE;
    restock_item RECORD;
    order_id UUID;
BEGIN
    sale_date := start_date;
    -- Loop through each date from start_date to end_date
    WHILE sale_date <= end_date LOOP
        -- Generate a random number of sales for the current date
        num_sales := 10 + FLOOR(random() * 16)::INTEGER;

        -- Loop through the number of sales for the current date
        FOR i IN 1..num_sales LOOP
            -- Select a random item from the inventory
            SELECT ci.product_sku, ci.sell_price, ci.inventory_level, ci.store_id INTO product_sku, price, inventory_level, store_id
            FROM c_inventory ci
            WHERE ci.inventory_level > 0
            ORDER BY random()
            LIMIT 1;

            -- If no items available in inventory, skip to next sale
            IF NOT FOUND THEN
                CONTINUE;
            END IF;

            -- Generate a random quantity between 1 and 5
            quantity := 1 + FLOOR(random() * 5)::INTEGER;

            -- Ensure that we do not sell more than the available inventory
            IF quantity > inventory_level THEN
                quantity := inventory_level;
            END IF;

            -- Calculate the total price
            total := price * quantity;

            -- Generate a random boolean for customer (yes/no)
            customer := (random() < 0.5);

            -- Optionally select a random customer if the sale has a customer
            IF customer THEN
                SELECT cc.customer_id INTO customer_id
                FROM c_customer cc
                ORDER BY random()
                LIMIT 1;
            ELSE
                customer_id := NULL;
            END IF;

            -- Select a random employee
            SELECT ce.emp_id INTO employee_id
            FROM c_employee ce
            ORDER BY random()
            LIMIT 1;

            -- Insert the transaction into the c_transaction table
            INSERT INTO c_transaction (transaction_id, transaction_cost, customer_id, transaction_tax, transaction_prov, emp_id, payment_method, transaction_status, store_id, created_at, updated_at)
            VALUES (uuid_generate_v4(), total, customer_id, total * tax_rate, 'AB', employee_id, 'Credit Card', 'Completed', store_id, sale_date, sale_date)
            RETURNING c_transaction.transaction_id INTO transaction_id;

            -- Insert the transaction details into the c_transaction_details table
            INSERT INTO c_transaction_details (transaction_item_id, transaction_id, product_sku, transaction_quantity, transaction_cost, store_id)
            VALUES (uuid_generate_v4(), transaction_id, product_sku, quantity, total, store_id);

        END LOOP;

        -- Check if it's the first day or Friday to place restocking orders
        IF sale_date = start_date OR EXTRACT(DOW FROM sale_date) = 5 THEN
            FOR restock_item IN (SELECT ci.product_sku, ci.sell_price, ci.store_id
                                FROM c_inventory ci
                                WHERE ci.inventory_level < restock_threshold) LOOP
                -- Select a random supplier
                SELECT cs.supplier_id INTO supplier_id
                FROM c_supplier cs
                ORDER BY random()
                LIMIT 1;

                -- Create a new order to restock the product
                order_date := sale_date;
                INSERT INTO c_order (order_id, supplier_id, order_date, order_status, last_modified, store_id, created_at, updated_at)
                VALUES (uuid_generate_v4(), supplier_id, order_date, 'Pending', order_date, restock_item.store_id, order_date, order_date)
                RETURNING c_order.order_id INTO order_id;

                -- Insert order details
                INSERT INTO c_order_details (order_item_id, order_id, product_sku, order_quantity, order_cost, store_id)
                VALUES (uuid_generate_v4(), order_id, restock_item.product_sku, restock_quantity, restock_quantity * restock_item.sell_price, restock_item.store_id);

                -- Mark the order as received and update inventory
                UPDATE c_order
                SET order_status = 'Received', last_modified = NOW()
                WHERE order_id = order_id;

                -- Update the inventory with the received quantity
                UPDATE c_inventory
                SET inventory_level = inventory_level + restock_quantity, updated_at = NOW()
                WHERE product_sku = restock_item.product_sku AND store_id = restock_item.store_id;
            END LOOP;
        END IF;

        -- Move to the next day
        sale_date := sale_date + INTERVAL '1 day';
    END LOOP;
END;
$$ LANGUAGE plpgsql;
