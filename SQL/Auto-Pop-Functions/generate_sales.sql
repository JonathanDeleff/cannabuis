
CREATE OR REPLACE FUNCTION generate_sales(sale_date DATE, customer_count INTEGER)
RETURNS VOID AS $$
DECLARE
    num_sales INTEGER;
    i INTEGER;
    product_sku VARCHAR(20);
    quantity INTEGER;
    price NUMERIC;
    total NUMERIC;
    add_new_customer BOOLEAN;
    customer_id UUID;
    employee_id UUID;
    store_id UUID;
    transaction_id UUID;
    inventory_level INTEGER;
    new_customer_probability NUMERIC;
BEGIN
    num_sales := 10 + FLOOR(random() * 16)::INTEGER;

    FOR i IN 1..num_sales LOOP
        SELECT ci.product_sku, ci.sell_price, ci.inventory_level, ci.store_id INTO product_sku, price, inventory_level, store_id
        FROM c_inventory ci
        WHERE ci.inventory_level > 0
        ORDER BY random()
        LIMIT 1;

        IF NOT FOUND THEN
            CONTINUE;
        END IF;

        quantity := 1 + FLOOR(random() * 5)::INTEGER;
        IF quantity > inventory_level THEN
            quantity := inventory_level;
        END IF;

        total := price * quantity;
        new_customer_probability := LEAST(0.2, 1.0 / (customer_count + 1));
        add_new_customer := (random() < new_customer_probability);

        IF add_new_customer THEN
            customer_count := customer_count + 1;
            INSERT INTO c_customer (customer_id, customer_fname, customer_lname, customer_email, customer_phone, street_address, city, province, postal_code, is_primary_address, store_id, created_at, updated_at)
            VALUES (
                uuid_generate_v4(), 
                initcap(md5(random()::text)::text), 
                initcap(md5(random()::text)::text), 
                lower(md5(random()::text)::text) || '@example.com', 
                '403-555-' || lpad((1000 + floor(random() * 9000)::int)::text, 4, '0'), 
                (100 + floor(random() * 900)::int) || ' Main St', 
                'Calgary', 
                'AB', 
                'T2P ' || floor(random() * 10)::int || floor(random() * 10)::int || floor(random() * 10)::int, 
                TRUE, 
                (SELECT store_id FROM c_store LIMIT 1 OFFSET floor(random() * 2)), 
                NOW(), 
                NOW()
            )
            RETURNING customer_id;
        ELSE
            IF random() < 0.6 THEN
                SELECT cc.customer_id INTO customer_id
                FROM c_customer cc
                ORDER BY random()
                LIMIT 1;
            ELSE
                customer_id := NULL;
            END IF;
        END IF;

        SELECT ce.emp_id INTO employee_id
        FROM c_employee ce
        ORDER BY random()
        LIMIT 1;

        INSERT INTO c_transaction (transaction_id, transaction_cost, customer_id, transaction_tax, transaction_prov, emp_id, payment_method, transaction_status, store_id, created_at, updated_at)
        VALUES (uuid_generate_v4(), total, customer_id, total * 0.05, 'AB', employee_id, 'Credit Card', 'Completed', store_id, sale_date, sale_date)
        RETURNING transaction_id INTO transaction_id;

        INSERT INTO c_transaction_details (transaction_item_id, transaction_id, product_sku, transaction_quantity, transaction_cost, store_id)
        VALUES (uuid_generate_v4(), transaction_id, product_sku, quantity, total, store_id);

    END LOOP;
END;
$$ LANGUAGE plpgsql;
    