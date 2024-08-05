-- Insert dummy data into c_store
INSERT INTO c_store (store_id, store_name, store_address, store_city, store_province, store_postal_code)
VALUES 
(uuid_generate_v4(), 'Main Store', '100 Main St', 'Cityville', 'AB', '90001'),
(uuid_generate_v4(), 'Secondary Store', '200 Side St', 'Townsville', 'AB', '70002');

-- Insert dummy data into c_customer
INSERT INTO c_customer (customer_id, customer_fname, customer_lname, customer_email, customer_phone, street_address, city, province, postal_code, store_id)
VALUES 
(uuid_generate_v4(), 'John', 'Doe', 'john.doe@example.com', '555-1234', '123 Main St', 'Anytown', 'AB', '12345', (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
(uuid_generate_v4(), 'Jane', 'Smith', 'jane.smith@example.com', '555-5678', '456 Oak St', 'Othertown', 'AB', '67890', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'));

-- Insert an admin employee with the email admin@email.com
INSERT INTO c_employee (emp_id, emp_fname, emp_lname, emp_email, emp_jobtitle, date_of_hire, password, store_id)
VALUES 
(uuid_generate_v4(), 'Admin', 'User', 'admin@email.com', 'Administrator', '2024-01-01', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'));

-- Insert dummy data into c_employee with passwords
INSERT INTO c_employee (emp_id, emp_fname, emp_lname, emp_email, emp_jobtitle, date_of_hire, password, store_id)
VALUES 
(uuid_generate_v4(), 'Alice', 'Johnson', 'alice.johnson@example.com', 'Manager', '2020-01-15', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
(uuid_generate_v4(), 'Bob', 'Williams', 'bob.williams@example.com', 'Sales', '2019-03-22', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'));

-- Insert dummy data into c_product with SKU format CNB######
INSERT INTO c_product (product_sku, product_brand, product_title, product_description, product_weight, product_equivalency, category, subcategory, case_size, cost_price, tags)
VALUES 
('CNB000001', 'Brand X', 'Infused Pre-roll', 'High quality infused pre-roll.', 0.5, 'Pre-roll', 'Pre-Rolls', 'Infused', 20, 5.00, 'THC, CBD'),
('CNB000002', 'Brand Y', 'Non-Infused Pre-roll', 'Premium non-infused pre-roll.', 0.5, 'Pre-roll', 'Pre-Rolls', 'Non-Infused', 20, 4.50, 'THC, CBD'),
('CNB000003', 'Brand A', 'Blunt Pre-roll', 'Delicious blunt pre-roll.', 0.7, 'Pre-roll', 'Pre-Rolls', 'Blunts', 15, 6.00, 'THC'),
('CNB000004', 'Brand B', '510 Cartridge', 'High quality 510 cartridge.', 0.5, 'Vape', 'Vapes', '510 Cartridge', 30, 10.00, 'THC, CBD'),
('CNB000005', 'Brand X', 'Pod Vape', 'Convenient pod vape.', 0.5, 'Vape', 'Vapes', 'Pods', 25, 8.50, 'THC, CBD'),
('CNB000006', 'Brand Y', 'CBD Vape', 'Pure CBD vape.', 0.5, 'Vape', 'Vapes', 'CBD', 20, 7.00, 'CBD'),
('CNB000007', 'Brand A', 'Full Spectrum Vape', 'Full spectrum live resin vape.', 0.5, 'Vape', 'Vapes', 'Full Spectrum/Live Resin', 20, 12.00, 'THC, CBD'),
('CNB000008', 'Brand B', 'Sativa Flower', 'Premium quality sativa flower.', 1.0, 'Flower', 'Flower', 'Sativa', 10, 8.00, 'THC'),
('CNB000009', 'Brand X', 'Indica Flower', 'Premium quality indica flower.', 1.0, 'Flower', 'Flower', 'Indica', 10, 8.00, 'THC'),
('CNB000010', 'Brand Y', 'Hybrid Flower', 'Premium quality hybrid flower.', 1.0, 'Flower', 'Flower', 'Hybrid', 10, 8.00, 'THC, CBD'),
('CNB000011', 'Brand A', 'CBD Flower', 'Premium quality CBD flower.', 1.0, 'Flower', 'Flower', 'CBD Flower', 10, 8.00, 'CBD'),
('CNB000012', 'Brand C', 'Cannabis Gummies', 'Delicious cannabis gummies.', 0.2, 'Gummy', 'Edibles', 'Gummies', 50, 2.00, 'THC, CBD'),
('CNB000013', 'Brand D', 'Cannabis Chocolate', 'Delicious cannabis-infused chocolate.', 0.2, 'Chocolate', 'Edibles', 'Chocolates', 50, 2.50, 'THC, CBD'),
('CNB000014', 'Brand E', 'Cannabis Beverage', 'Refreshing cannabis-infused beverage.', 0.5, 'Beverage', 'Edibles', 'Beverages', 30, 3.00, 'THC, CBD'),
('CNB000015', 'Brand F', 'CBD Lotion', 'Hydrating CBD-infused lotion.', 0.5, 'Lotion', 'Topicals', 'Lotions', 40, 7.00, 'CBD'),
('CNB000016', 'Brand G', 'THC Balm', 'Soothing THC-infused balm.', 0.3, 'Balm', 'Topicals', 'Balms', 30, 8.00, 'THC'),
('CNB000017', 'Brand H', 'CBD Oil', 'Pure CBD oil.', 0.5, 'Oil', 'Topicals', 'Oils', 50, 10.00, 'CBD'),
('CNB000018', 'Brand I', 'THC Patch', 'Convenient THC-infused patch.', 0.1, 'Patch', 'Topicals', 'Patches', 20, 6.00, 'THC');

-- Insert dummy data into c_inventory
INSERT INTO c_inventory (inventory_id, product_sku, store_id, inventory_level, sell_price, discount_price)
VALUES 
(uuid_generate_v4(), 'CNB000001', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'), 100, 7.00, 6.00),
(uuid_generate_v4(), 'CNB000002', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'), 200, 6.50, 5.50),
(uuid_generate_v4(), 'CNB000003', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'), 150, 8.00, 7.00),
(uuid_generate_v4(), 'CNB000004', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'), 80, 12.00, 11.00),
(uuid_generate_v4(), 'CNB000008', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'), 120, 10.00, 9.00),
(uuid_generate_v4(), 'CNB000009', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'), 90, 10.00, 9.00),
(uuid_generate_v4(), 'CNB000010', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'), 130, 10.00, 9.00),
(uuid_generate_v4(), 'CNB000011', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'), 70, 10.00, 9.00),
(uuid_generate_v4(), 'CNB000012', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'), 150, 4.00, 3.50),
(uuid_generate_v4(), 'CNB000013', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'), 140, 5.00, 4.50),
(uuid_generate_v4(), 'CNB000014', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'), 160, 6.00, 5.50),
(uuid_generate_v4(), 'CNB000015', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'), 110, 8.00, 7.50),
(uuid_generate_v4(), 'CNB000016', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'), 100, 10.00, 9.00),
(uuid_generate_v4(), 'CNB000017', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'), 130, 15.00, 14.00),
(uuid_generate_v4(), 'CNB000018', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'), 90, 7.00, 6.50);

-- Insert dummy data into c_supplier
INSERT INTO c_supplier (supplier_id, supplier_name, supplier_email, supplier_phone, contact_person, supplier_city, supplier_province, supplier_website, store_id)
VALUES 
(uuid_generate_v4(), 'Green Supply Co.', 'info@greensupply.com', '555-8765', 'Michael Green', 'Supplytown', 'AB', 'http://www.greensupply.com', (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
(uuid_generate_v4(), 'Herbal Goods Inc.', 'contact@herbalgoods.com', '555-4321', 'Sarah Brown', 'Goodsville', 'AB', 'http://www.herbalgoods.com', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'));

-- Insert dummy data into c_transaction
INSERT INTO c_transaction (transaction_id, transaction_cost, customer_id, transaction_tax, transaction_prov, emp_id, payment_method, transaction_status, store_id)
VALUES 
(uuid_generate_v4(), 200.00, (SELECT customer_id FROM c_customer WHERE customer_fname = 'John' AND customer_lname = 'Doe'), 20.00, 'AB', (SELECT emp_id FROM c_employee WHERE emp_fname = 'Alice' AND emp_lname = 'Johnson'), 'Credit Card', 'sold', (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
(uuid_generate_v4(), 150.00, (SELECT customer_id FROM c_customer WHERE customer_fname = 'Jane' AND customer_lname = 'Smith'), 15.00, 'AB', (SELECT emp_id FROM c_employee WHERE emp_fname = 'Bob' AND emp_lname = 'Williams'), 'Cash', 'pending', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'));

-- Insert dummy data into c_order
INSERT INTO c_order (order_id, supplier_id, order_date, order_status, store_id)
VALUES 
(uuid_generate_v4(), (SELECT supplier_id FROM c_supplier WHERE supplier_name = 'Green Supply Co.'), '2023-01-10', 'delivered', (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
(uuid_generate_v4(), (SELECT supplier_id FROM c_supplier WHERE supplier_name = 'Herbal Goods Inc.'), '2023-02-15', 'on route', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'));

-- Insert dummy data into c_order_details to account for all existing stock
INSERT INTO c_order_details (order_item_id, order_id, product_sku, order_quantity, order_cost, store_id)
VALUES 
(uuid_generate_v4(), (SELECT order_id FROM c_order WHERE supplier_id = (SELECT supplier_id FROM c_supplier WHERE supplier_name = 'Green Supply Co.')), 'CNB000001', 10, 500.00, (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
(uuid_generate_v4(), (SELECT order_id FROM c_order WHERE supplier_id = (SELECT supplier_id FROM c_supplier WHERE supplier_name = 'Herbal Goods Inc.')), 'CNB000002', 20, 600.00, (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store')),
(uuid_generate_v4(), (SELECT order_id FROM c_order WHERE supplier_id = (SELECT supplier_id FROM c_supplier WHERE supplier_name = 'Green Supply Co.')), 'CNB000003', 5, 200.00, (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
(uuid_generate_v4(), (SELECT order_id FROM c_order WHERE supplier_id = (SELECT supplier_id FROM c_supplier WHERE supplier_name = 'Herbal Goods Inc.')), 'CNB000004', 8, 360.00, (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'));

-- Insert dummy data into c_transaction_details
INSERT INTO c_transaction_details (transaction_item_id, transaction_id, product_sku, transaction_quantity, transaction_cost, store_id)
VALUES 
(uuid_generate_v4(), (SELECT transaction_id FROM c_transaction WHERE customer_id = (SELECT customer_id FROM c_customer WHERE customer_fname = 'John' AND customer_lname = 'Doe')), 'CNB000001', 2, 140.00, (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
(uuid_generate_v4(), (SELECT transaction_id FROM c_transaction WHERE customer_id = (SELECT customer_id FROM c_customer WHERE customer_fname = 'Jane' AND customer_lname = 'Smith')), 'CNB000002', 3, 90.00, (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store'));


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
    'Jonathan', 
    'Deleff', 
    'jonathan.deleff@edu.sait.ca', 
    '403-555-1234', 
    '123 Main St', 
    'Calgary', 
    'AB', 
    'T2P 1J9', 
    TRUE, 
    (SELECT store_id FROM c_store LIMIT 1), 
    NOW(), 
    NOW()
);
