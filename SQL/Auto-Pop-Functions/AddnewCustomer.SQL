CREATE OR REPLACE FUNCTION add_new_customer()
RETURNS UUID AS $$
DECLARE
    customer_id UUID;
    first_names TEXT[] := ARRAY['Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Kathy', 'Liam', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Ryan', 'Sophia', 'Tom', 'Uma', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zoe', 'Benjamin', 'Emma', 'Michael', 'Isabella', 'William', 'Elizabeth', 'James', 'Charlotte', 'Alexander', 'Amelia', 'Daniel', 'Harper', 'Matthew', 'Evelyn', 'Joseph', 'Abigail'];
    last_names TEXT[] := ARRAY['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Martinez', 'Davis', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Young', 'Hall', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker'];
    first_name TEXT;
    last_name TEXT;
    email_suffix TEXT;
BEGIN
    first_name := first_names[1 + floor(random() * array_length(first_names, 1))::int];
    last_name := last_names[1 + floor(random() * array_length(last_names, 1))::int];
    email_suffix := (1000 + floor(random() * 9000))::text; -- Ensure unique email addresses

    INSERT INTO c_customer (
        customer_id, 
        customer_fname, 
        customer_lname, 
        customer_email, 
        customer_phone, 
        street_address, 
        city, 
        province, 
        postal_code, 
        is_primary_address, 
        store_id, 
        created_at, 
        updated_at
    ) VALUES (
        uuid_generate_v4(), 
        first_name, 
        last_name, 
        lower(first_name || '.' || last_name || email_suffix || '@example.com'),  -- Generate email based on names
        '403-555-' || lpad((1000 + floor(random() * 9000)::int)::text, 4, '0'),  -- Generate random phone number
        (100 + floor(random() * 900)::int) || ' Main St',  -- Generate random street address
        'Calgary', 
        'AB', 
        'T2P ' || floor(random() * 10)::int || floor(random() * 10)::int || floor(random() * 10)::int,  -- Generate random postal code
        TRUE, 
        (SELECT store_id FROM c_store LIMIT 1 OFFSET floor(random() * 2)),  -- Randomly assign a store
        NOW(), 
        NOW()
    )
    RETURNING customer_id INTO customer_id;

    RETURN customer_id;
END;
$$ LANGUAGE plpgsql;
