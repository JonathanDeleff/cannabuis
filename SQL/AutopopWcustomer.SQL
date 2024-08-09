CREATE OR REPLACE FUNCTION generate_random_sales(
    start_date DATE,
    end_date DATE
)
RETURNS VOID AS $$
DECLARE
    sale_date DATE;
    num_sales INTEGER;
    i INTEGER;
    selected_product_sku VARCHAR(20);
    quantity INTEGER;
    price NUMERIC;
    sale_price NUMERIC;
    total NUMERIC;
    add_new_customer BOOLEAN;
    new_customer_id UUID;
    employee_id UUID;
    selected_store_id UUID;
    new_transaction_id UUID;
    inventory_level INTEGER;
    restock_quantity INTEGER := 12; 
    restock_threshold INTEGER := 10; -- Restock if inventory falls below this level
    supplier_id UUID;
    tax_rate NUMERIC := 0.05; -- Assuming a tax rate of 5%
    order_date DATE;
    restock_item RECORD;
    new_order_id UUID;
    customer_count INTEGER;
    new_customer_probability NUMERIC;
    first_names TEXT[] := ARRAY['Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Kathy', 'Liam', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Ryan', 'Sophia', 'Tom', 'Uma', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zoe', 'Benjamin', 'Emma', 'Michael', 'Isabella', 'William', 'Elizabeth', 'James', 'Charlotte', 'Alexander', 'Amelia', 'Daniel', 'Harper', 'Matthew', 'Evelyn', 'Joseph', 'Abigail'];
    last_names TEXT[] := ARRAY['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Martinez', 'Davis', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Young', 'Hall', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker'];
    first_name TEXT;
    last_name TEXT;
    email_suffix TEXT;
    return_probability NUMERIC := 0.33; -- Probability of return happening each day (approx. once in every 3 days)
BEGIN
    sale_date := start_date;

    -- Check the initial number of customers
    SELECT COUNT(*) INTO customer_count FROM c_customer;

    -- Initial stock ordering
    FOR restock_item IN (
        SELECT p.product_sku, p.cost_price, p.case_size, s.store_id
        FROM c_product p, c_store s
    ) LOOP
        -- Insert initial stock into inventory or set to initial case size if conflict
        INSERT INTO c_inventory (product_sku, store_id, inventory_level, sell_price, updated_at)
        VALUES (restock_item.product_sku, restock_item.store_id, restock_item.case_size, restock_item.cost_price * 1.5, NOW())
        ON CONFLICT (product_sku, store_id) DO NOTHING;
    END LOOP;

    -- Loop through each date from start_date to end_date
    WHILE sale_date <= end_date LOOP
        -- Generate a random number of sales for the current date
        num_sales := 10 + FLOOR(random() * 16)::INTEGER;

        -- Loop through the number of sales for the current date
        FOR i IN 1..num_sales LOOP
            -- Select a random item from the inventory
            SELECT i.product_sku, i.sell_price, i.inventory_level, i.store_id 
            INTO selected_product_sku, price, inventory_level, selected_store_id
            FROM c_inventory i
            WHERE i.inventory_level > 0
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

            -- Calculate the sale price (90% of the sell price)
            sale_price := price * 0.90;

            -- Calculate the total price
            total := sale_price * quantity;

            -- Determine the probability of adding a new customer
            new_customer_probability := LEAST(0.2, 1.0 / (customer_count + 1));

            -- Decide whether to add a new customer based on the probability
            add_new_customer := (random() < new_customer_probability);

            IF add_new_customer THEN
                -- Generate realistic names and email
                first_name := first_names[1 + floor(random() * array_length(first_names, 1))::int];
                last_name := last_names[1 + floor(random() * array_length(last_names, 1))::int];
                email_suffix := (1000 + floor(random() * 9000))::text; -- Ensure unique email addresses

                -- Add a new customer
                customer_count := customer_count + 1;
                INSERT INTO c_customer (customer_id, customer_fname, customer_lname, customer_email, customer_phone, street_address, city, province, postal_code, is_primary_address, store_id, created_at, updated_at)
                VALUES (
                    uuid_generate_v4(), 
                    first_name, 
                    last_name, 
                    lower(first_name || '.' || last_name || email_suffix || '@example.com'), 
                    '403-555-' || lpad((1000 + floor(random() * 9000)::int)::text, 4, '0'), 
                    (100 + floor(random() * 900)::int) || ' Main St', 
                    'Calgary', 
                    'AB', 
                    'T2P ' || floor(random() * 10)::int || floor(random() * 10)::int || floor(random() * 10)::int, 
                    TRUE, 
                    (SELECT s.store_id FROM c_store s LIMIT 1 OFFSET floor(random() * 2)), 
                    NOW(), 
                    NOW()
                )
                RETURNING customer_id INTO new_customer_id;
            ELSE
                -- Select a random existing customer
                SELECT c.customer_id INTO new_customer_id
                FROM c_customer c
                ORDER BY random()
                LIMIT 1;
            END IF;

            -- Select a random employee
            SELECT e.emp_id INTO employee_id
            FROM c_employee e
            ORDER BY random()
            LIMIT 1;

            -- Insert the transaction into the c_transaction table
            INSERT INTO c_transaction (transaction_id, transaction_cost, customer_id, transaction_tax, transaction_prov, emp_id, payment_method, transaction_status, store_id, created_at, updated_at)
            VALUES (uuid_generate_v4(), total, new_customer_id, total * tax_rate, 'AB', employee_id, 'Credit Card', 'Completed', selected_store_id, sale_date, sale_date)
            RETURNING transaction_id INTO new_transaction_id;

            -- Insert the transaction details into the c_transaction_details table
            INSERT INTO c_transaction_details (transaction_item_id, transaction_id, product_sku, transaction_quantity, transaction_cost, store_id)
            VALUES (uuid_generate_v4(), new_transaction_id, selected_product_sku, quantity, total, selected_store_id);

            -- Update the inventory with the sold quantity
            UPDATE c_inventory
            SET inventory_level = inventory_level - quantity, updated_at = NOW()
            WHERE product_sku = selected_product_sku AND store_id = selected_store_id;

        END LOOP;

        -- Process returns with a certain probability
        IF random() < return_probability THEN
            -- Select a random transaction to return
            SELECT transaction_id INTO new_transaction_id
            FROM c_transaction
            ORDER BY random()
            LIMIT 1;

            -- Select a random item from the selected transaction
            SELECT d.product_sku, d.transaction_quantity, d.transaction_cost, d.store_id
            INTO selected_product_sku, quantity, total, selected_store_id
            FROM c_transaction_details d
            WHERE d.transaction_id = new_transaction_id
            ORDER BY random()
            LIMIT 1;

            -- Insert the return transaction
            INSERT INTO c_transaction (transaction_id, transaction_cost, customer_id, transaction_tax, transaction_prov, emp_id, payment_method, transaction_status, store_id, created_at, updated_at)
            VALUES (uuid_generate_v4(), -total, new_customer_id, -total * tax_rate, 'AB', employee_id, 'Credit Card', 'Returned', selected_store_id, sale_date, sale_date)
            RETURNING transaction_id INTO new_transaction_id;

            -- Insert the return transaction details
            INSERT INTO c_transaction_details (transaction_item_id, transaction_id, product_sku, transaction_quantity, transaction_cost, store_id)
            VALUES (uuid_generate_v4(), new_transaction_id, selected_product_sku, -quantity, -total, selected_store_id);

            -- Update the inventory with the returned quantity
            UPDATE c_inventory
            SET inventory_level = inventory_level + quantity, updated_at = NOW()
            WHERE product_sku = selected_product_sku AND store_id = selected_store_id;
        END IF;

        -- Check if it's the first day or Friday to place restocking orders
        IF sale_date = start_date OR EXTRACT(DOW FROM sale_date) = 5 THEN
            FOR restock_item IN (SELECT i.product_sku, i.sell_price, i.store_id, p.case_size, p.cost_price
                                FROM c_inventory i
                                JOIN c_product p ON i.product_sku = p.product_sku
                                WHERE i.inventory_level < (p.case_size * 0.6)) LOOP
                -- Select a random supplier
                SELECT s.supplier_id INTO supplier_id
                FROM c_supplier s
                ORDER BY random()
                LIMIT 1;

                -- Create a new order to restock the product
                order_date := sale_date;
                INSERT INTO c_order (order_id, supplier_id, order_date, order_status, last_modified, store_id, created_at, updated_at)
                VALUES (uuid_generate_v4(), supplier_id, order_date, 'Pending', order_date, restock_item.store_id, order_date, order_date)
                RETURNING order_id INTO new_order_id;

                -- Insert order details
                INSERT INTO c_order_details (order_item_id, order_id, product_sku, order_quantity, order_cost, store_id)
                VALUES (uuid_generate_v4(), new_order_id, restock_item.product_sku, restock_item.case_size, restock_item.case_size * restock_item.cost_price, restock_item.store_id);

                -- Mark the order as received and update inventory
                UPDATE c_order
                SET order_status = 'Received', last_modified = NOW()
                WHERE order_id = new_order_id;

                -- Update the inventory with the received quantity
                UPDATE c_inventory
                SET inventory_level = inventory_level + restock_item.case_size, updated_at = NOW()
                WHERE product_sku = restock_item.product_sku AND store_id = restock_item.store_id;
            END LOOP;
        END IF;

        -- Move to the next day
        sale_date := sale_date + INTERVAL '1 day';
    END LOOP;
END;
$$ LANGUAGE plpgsql;
