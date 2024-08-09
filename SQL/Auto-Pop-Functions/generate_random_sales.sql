
CREATE OR REPLACE FUNCTION generate_random_sales(start_date DATE, end_date DATE)
RETURNS VOID AS $$
DECLARE
    sale_date DATE;
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
    customer_count INTEGER;
    new_customer_probability NUMERIC;
BEGIN
    sale_date := start_date;
    SELECT COUNT(*) INTO customer_count FROM c_customer;

    WHILE sale_date <= end_date LOOP
        PERFORM place_restock_orders(sale_date);
        PERFORM generate_sales(sale_date, customer_count);
        PERFORM process_returns(sale_date);
        sale_date := sale_date + INTERVAL '1 day';
    END LOOP;
END;
$$ LANGUAGE plpgsql;
    