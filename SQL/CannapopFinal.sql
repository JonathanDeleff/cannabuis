-- Insert dummy data into c_store
INSERT INTO c_store (store_name, store_address, store_city, store_province, store_postal_code)
VALUES 
('Main Store', '100 Main St', 'Cityville', 'AB', '90001'),
('Secondary Store', '200 Side St', 'Townsville', 'AB', '70002');

-- Insert admin employee with the email admin@email.com
INSERT INTO c_employee (emp_fname, emp_lname, emp_email, emp_jobtitle, date_of_hire, password, store_id)
VALUES 
('Admin', 'User', 'admin@email.com', 'Administrator', '2024-01-01', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'));

-- Insert dummy data into c_employee with realistic names and emails
INSERT INTO c_employee (emp_fname, emp_lname, emp_email, emp_jobtitle, date_of_hire, password, store_id)
VALUES 
('Emily', 'Clark', 'emily.clark@example.com', 'Manager', '2022-05-10', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
('Michael', 'Harris', 'michael.harris@example.com', 'Sales', '2023-06-20', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store')),
('Sophia', 'Lewis', 'sophia.lewis@example.com', 'Sales', '2021-03-15', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
('James', 'Walker', 'james.walker@example.com', 'Sales', '2020-11-01', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store')),
('Isabella', 'Allen', 'isabella.allen@example.com', 'Sales', '2019-07-25', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
('Daniel', 'Young', 'daniel.young@example.com', 'Manager', '2018-09-14', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store')),
('Olivia', 'King', 'olivia.king@example.com', 'Sales', '2017-02-28', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
('Lucas', 'Wright', 'lucas.wright@example.com', 'Sales', '2016-10-05', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store')),
('Mia', 'Scott', 'mia.scott@example.com', 'Manager', '2021-01-30', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
('Noah', 'Green', 'noah.green@example.com', 'Sales', '2022-12-18', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store')),
('Emma', 'Baker', 'emma.baker@example.com', 'Sales', '2019-05-09', 'password', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'));

-- Insert dummy data into c_supplier
INSERT INTO c_supplier (supplier_name, supplier_email, supplier_phone, contact_person, supplier_city, supplier_province, supplier_website, store_id)
VALUES 
('AGLC', 'contact@aglc.ca', '403-555-6789', 'John Supervisor', 'Edmonton', 'AB', 'http://www.aglc.ca', (SELECT store_id FROM c_store WHERE store_name = 'Main Store')),
('Green Supply Co.', 'info@greensupply.com', '403-555-8765', 'Michael Green', 'Supplytown', 'AB', 'http://www.greensupply.com', (SELECT store_id FROM c_store WHERE store_name = 'Secondary Store')),
('Herbal Goods Inc.', 'contact@herbalgoods.com', '403-555-4321', 'Sarah Brown', 'Goodsville', 'AB', 'http://www.herbalgoods.com', (SELECT store_id FROM c_store WHERE store_name = 'Main Store'));

-- Insert a specific customer
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

-- Insert dummy data into c_product

INSERT INTO c_product (product_sku, product_brand, product_title, product_description, product_weight, product_equivalency, category, subcategory, case_size, cost_price, tags)
VALUES 
('CNB000001', 'Aurora', 'Aurora Indica Infused Pre-roll', 'High quality infused pre-roll of Aurora Indica strain.', 0.5, 'Pre-roll', 'Prerolls', 'Infused', 12, 8.00, 'THC, CBD'),
('CNB000002', 'Canopy', 'Blue Dream Single Pre-roll', 'Premium single pre-roll of Blue Dream strain.', 0.5, 'Pre-roll', 'Prerolls', 'Singles', 12, 7.00, 'THC, CBD'),
('CNB000003', 'Tweed', 'Northern Lights Regular Pre-roll', 'Top quality regular pre-roll of Northern Lights strain.', 0.5, 'Pre-roll', 'Prerolls', 'Regular', 12, 6.50, 'THC, CBD'),
('CNB000004', 'Tilray', 'OG Kush Blunt', 'Delicious blunt pre-roll of OG Kush strain.', 0.7, 'Pre-roll', 'Prerolls', 'Blunts', 24, 9.00, 'THC'),
('CNB000005', 'Hexo', 'Sour Diesel Dart', 'High potency dart pre-roll of Sour Diesel strain.', 0.4, 'Pre-roll', 'Prerolls', 'Darts', 24, 8.50, 'THC, CBD'),
('CNB000006', 'Aurora', 'Aurora Indica Hybrid Flower', 'High quality hybrid flower of Aurora Indica strain.', 1.0, 'Flower', 'Flower', 'Hybrid', 12, 10.00, 'THC'),
('CNB000007', 'Canopy', 'Blue Dream Sativa Flower', 'Premium sativa flower of Blue Dream strain.', 1.0, 'Flower', 'Flower', 'Sativa', 24, 12.00, 'THC, CBD'),
('CNB000008', 'Tweed', 'Northern Lights Indica Flower', 'Top quality indica flower of Northern Lights strain.', 1.0, 'Flower', 'Flower', 'Indica', 12, 11.00, 'THC, CBD'),
('CNB000009', 'Tilray', 'OG Kush Hybrid Flower', 'High potency hybrid flower of OG Kush strain.', 1.0, 'Flower', 'Flower', 'Hybrid', 24, 11.50, 'THC'),
('CNB000010', 'Hexo', 'Sour Diesel Sativa Flower', 'Pure sativa flower of Sour Diesel strain.', 1.0, 'Flower', 'Flower', 'Sativa', 12, 12.50, 'THC, CBD'),
('CNB000011', 'Aurora', 'Aurora Indica Disposable Vape', 'Convenient disposable vape of Aurora Indica strain.', 0.5, 'Vape', 'Vapes', 'Disposable', 24, 25.00, 'THC, CBD'),
('CNB000012', 'Canopy', 'Blue Dream Cartridge', 'High quality vape cartridge of Blue Dream strain.', 0.5, 'Vape', 'Vapes', 'Cartridges', 12, 20.00, 'THC, CBD'),
('CNB000013', 'Tweed', 'Northern Lights CBD Oil', 'Pure CBD oil of Northern Lights strain.', 0.5, 'Oil', 'Wellness', 'Oils', 24, 35.00, 'CBD'),
('CNB000014', 'Tilray', 'OG Kush Topical Cream', 'Soothing topical cream infused with OG Kush strain.', 0.5, 'Topical', 'Wellness', 'Topical', 12, 30.00, 'THC, CBD'),
('CNB000015', 'Hexo', 'Sour Diesel Capsules', 'Convenient capsules of Sour Diesel strain.', 0.3, 'Capsule', 'Wellness', 'Capsules', 24, 25.00, 'THC, CBD'),
('CNB000016', 'Aurora', 'Aurora Indica Shatter', 'High potency shatter concentrate of Aurora Indica strain.', 0.5, 'Shatter', 'Concentrates', 'Shatter', 12, 40.00, 'THC'),
('CNB000017', 'Canopy', 'Blue Dream Diamonds', 'Premium diamonds concentrate of Blue Dream strain.', 0.5, 'Diamonds', 'Concentrates', 'Diamonds', 24, 45.00, 'THC, CBD'),
('CNB000018', 'Tweed', 'Northern Lights Applicator', 'Easy to use applicator of Northern Lights concentrate.', 0.5, 'Applicator', 'Concentrates', 'Applicators', 12, 35.00, 'THC, CBD'),
('CNB000019', 'Tilray', 'OG Kush Resin', 'High quality resin of OG Kush strain.', 0.5, 'Resin', 'Concentrates', 'Resin', 24, 50.00, 'THC, CBD'),
('CNB000020', 'Hexo', 'Sour Diesel Rosin', 'Premium rosin of Sour Diesel strain.', 0.5, 'Rosin', 'Concentrates', 'Rosin', 12, 45.00, 'THC, CBD'),
('CNB000021', 'Aurora', 'Aurora Indica Chocolates', 'Delicious chocolates infused with Aurora Indica strain.', 0.2, 'Chocolate', 'Edibles', 'Chocolates', 24, 10.00, 'THC, CBD'),
('CNB000022', 'Canopy', 'Blue Dream Gummies', 'Tasty gummies infused with Blue Dream strain.', 0.2, 'Gummy', 'Edibles', 'Gummies', 12, 8.00, 'THC, CBD'),
('CNB000023', 'Tweed', 'Northern Lights Hard Candy', 'Hard candies infused with Northern Lights strain.', 0.2, 'Hard Candy', 'Edibles', 'Hard Candy', 24, 7.50, 'THC, CBD'),
('CNB000024', 'Tilray', 'OG Kush Baked Goods', 'Delicious baked goods infused with OG Kush strain.', 0.3, 'Baked Goods', 'Edibles', 'Baked Goods', 12, 12.00, 'THC, CBD'),
('CNB000025', 'Hexo', 'Sour Diesel Beverage', 'Refreshing beverage infused with Sour Diesel strain.', 0.5, 'Beverage', 'Edibles', 'Beverages', 24, 10.00, 'THC, CBD'),
('CNB000026', 'Aurora', 'Glass Pipe', 'High quality glass pipe for a smooth experience.', 0.5, 'Accessory', 'Accessories', 'Pipes', 12, 20.00, ''),
('CNB000027', 'Canopy', 'Rolling Papers', 'Premium rolling papers for a perfect roll.', 0.1, 'Accessory', 'Accessories', 'Papers', 24, 2.00, ''),
('CNB000028', 'Tweed', 'Lighter', 'Durable lighter for your smoking needs.', 0.2, 'Accessory', 'Accessories', 'Lighters', 12, 3.00, ''),
('CNB000029', 'Tilray', 'Bong', 'High quality bong for a smooth experience.', 1.0, 'Accessory', 'Accessories', 'Bongs', 24, 50.00, ''),
('CNB000030', 'Hexo', 'Vaporizer', 'Portable vaporizer for a clean and easy experience.', 0.7, 'Accessory', 'Accessories', 'Vaporizers', 12, 75.00, ''),
('CNB000041', 'Aurora', 'Northern Lights Disposable Vape', 'Convenient disposable vape of Northern Lights strain.', 0.5, 'Vape', 'Vapes', 'Disposable', 24, 26.00, 'THC, CBD'),
('CNB000042', 'Canopy', 'Jack Herer Cartridge', 'High quality vape cartridge of Jack Herer strain.', 0.5, 'Vape', 'Vapes', 'Cartridges', 12, 21.00, 'THC, CBD'),
('CNB000043', 'Tweed', 'Purple Haze CBD Oil', 'Pure CBD oil of Purple Haze strain.', 0.5, 'Oil', 'Wellness', 'Oils', 24, 36.00, 'CBD'),
('CNB000044', 'Tilray', 'Girl Scout Cookies Topical Cream', 'Soothing topical cream infused with Girl Scout Cookies strain.', 0.5, 'Topical', 'Wellness', 'Topical', 12, 31.00, 'THC, CBD'),
('CNB000045', 'Hexo', 'Green Crack Capsules', 'Convenient capsules of Green Crack strain.', 0.3, 'Capsule', 'Wellness', 'Capsules', 24, 26.00, 'THC, CBD'),
('CNB000046', 'Aurora', 'Wedding Cake Shatter', 'High potency shatter concentrate of Wedding Cake strain.', 0.5, 'Shatter', 'Concentrates', 'Shatter', 12, 41.00, 'THC'),
('CNB000047', 'Canopy', 'Jack Herer Diamonds', 'Premium diamonds concentrate of Jack Herer strain.', 0.5, 'Diamonds', 'Concentrates', 'Diamonds', 24, 46.00, 'THC, CBD'),
('CNB000048', 'Tweed', 'Super Lemon Haze Applicator', 'Easy to use applicator of Super Lemon Haze concentrate.', 0.5, 'Applicator', 'Concentrates', 'Applicators', 12, 36.00, 'THC, CBD'),
('CNB000049', 'Tilray', 'Pineapple Express Resin', 'High quality resin of Pineapple Express strain.', 0.5, 'Resin', 'Concentrates', 'Resin', 24, 51.00, 'THC, CBD'),
('CNB000050', 'Hexo', 'Bubba Kush Rosin', 'Premium rosin of Bubba Kush strain.', 0.5, 'Rosin', 'Concentrates', 'Rosin', 12, 46.00, 'THC, CBD'),
('CNB000051', 'Aurora', 'Northern Lights Chocolates', 'Delicious chocolates infused with Northern Lights strain.', 0.2, 'Chocolate', 'Edibles', 'Chocolates', 24, 11.00, 'THC, CBD'),
('CNB000052', 'Canopy', 'Jack Herer Gummies', 'Tasty gummies infused with Jack Herer strain.', 0.2, 'Gummy', 'Edibles', 'Gummies', 12, 9.00, 'THC, CBD'),
('CNB000053', 'Tweed', 'Purple Haze Hard Candy', 'Hard candies infused with Purple Haze strain.', 0.2, 'Hard Candy', 'Edibles', 'Hard Candy', 24, 8.00, 'THC, CBD'),
('CNB000054', 'Tilray', 'Girl Scout Cookies Baked Goods', 'Delicious baked goods infused with Girl Scout Cookies strain.', 0.3, 'Baked Goods', 'Edibles', 'Baked Goods', 12, 13.00, 'THC, CBD'),
('CNB000055', 'Hexo', 'Green Crack Beverage', 'Refreshing beverage infused with Green Crack strain.', 0.5, 'Beverage', 'Edibles', 'Beverages', 24, 11.00, 'THC, CBD'),
('CNB000056', 'Aurora', 'Ceramic Pipe', 'High quality ceramic pipe for a smooth experience.', 0.5, 'Accessory', 'Accessories', 'Pipes', 12, 22.00, ''),
('CNB000057', 'Canopy', 'Hemp Rolling Papers', 'Premium hemp rolling papers for a perfect roll.', 0.1, 'Accessory', 'Accessories', 'Papers', 24, 2.50, ''),
('CNB000058', 'Tweed', 'Windproof Lighter', 'Durable windproof lighter for your smoking needs.', 0.2, 'Accessory', 'Accessories', 'Lighters', 12, 3.50, ''),
('CNB000059', 'Tilray', 'Glass Bong', 'High quality glass bong for a smooth experience.', 1.0, 'Accessory', 'Accessories', 'Bongs', 24, 55.00, ''),
('CNB000060', 'Hexo', 'Portable Vaporizer', 'Portable vaporizer for a clean and easy experience.', 0.7, 'Accessory', 'Accessories', 'Vaporizers', 12, 80.00, ''),
('CNB000061', 'Aurora', 'Amnesia Haze Infused Pre-roll', 'High quality infused pre-roll of Amnesia Haze strain.', 0.5, 'Pre-roll', 'Prerolls', 'Infused', 12, 8.75, 'THC, CBD'),
('CNB000062', 'Canopy', 'Skywalker OG Single Pre-roll', 'Premium single pre-roll of Skywalker OG strain.', 0.5, 'Pre-roll', 'Prerolls', 'Singles', 24, 7.75, 'THC, CBD'),
('CNB000063', 'Tweed', 'Durban Poison Regular Pre-roll', 'Top quality regular pre-roll of Durban Poison strain.', 0.5, 'Pre-roll', 'Prerolls', 'Regular', 12, 6.85, 'THC, CBD'),
('CNB000064', 'Tilray', 'Cherry Pie Blunt', 'Delicious blunt pre-roll of Cherry Pie strain.', 0.7, 'Pre-roll', 'Prerolls', 'Blunts', 24, 9.75, 'THC'),
('CNB000065', 'Hexo', 'Lemon Skunk Dart', 'High potency dart pre-roll of Lemon Skunk strain.', 0.4, 'Pre-roll', 'Prerolls', 'Darts', 12, 8.85, 'THC, CBD'),
('CNB000066', 'Aurora', 'Blue Cheese Hybrid Flower', 'High quality hybrid flower of Blue Cheese strain.', 1.0, 'Flower', 'Flower', 'Hybrid', 24, 10.75, 'THC'),
('CNB000067', 'Canopy', 'Strawberry Cough Sativa Flower', 'Premium sativa flower of Strawberry Cough strain.', 1.0, 'Flower', 'Flower', 'Sativa', 12, 12.75, 'THC, CBD'),
('CNB000068', 'Tweed', 'Granddaddy Purple Indica Flower', 'Top quality indica flower of Granddaddy Purple strain.', 1.0, 'Flower', 'Flower', 'Indica', 24, 11.50, 'THC, CBD'),
('CNB000069', 'Tilray', 'AK-47 Hybrid Flower', 'High potency hybrid flower of AK-47 strain.', 1.0, 'Flower', 'Flower', 'Hybrid', 12, 12.00, 'THC'),
('CNB000070', 'Hexo', 'Haze Sativa Flower', 'Pure sativa flower of Haze strain.', 1.0, 'Flower', 'Flower', 'Sativa', 24, 13.25, 'THC, CBD'),
('CNB000071', 'Aurora', 'OG Kush Disposable Vape', 'Convenient disposable vape of OG Kush strain.', 0.5, 'Vape', 'Vapes', 'Disposable', 12, 27.00, 'THC, CBD'),
('CNB000072', 'Canopy', 'Amnesia Haze Cartridge', 'High quality vape cartridge of Amnesia Haze strain.', 0.5, 'Vape', 'Vapes', 'Cartridges', 24, 22.00, 'THC, CBD'),
('CNB000073', 'Tweed', 'Skywalker OG CBD Oil', 'Pure CBD oil of Skywalker OG strain.', 0.5, 'Oil', 'Wellness', 'Oils', 12, 37.00, 'CBD'),
('CNB000074', 'Tilray', 'Durban Poison Topical Cream', 'Soothing topical cream infused with Durban Poison strain.', 0.5, 'Topical', 'Wellness', 'Topical', 24, 32.00, 'THC, CBD'),
('CNB000075', 'Hexo', 'Cherry Pie Capsules', 'Convenient capsules of Cherry Pie strain.', 0.3, 'Capsule', 'Wellness', 'Capsules', 12, 27.00, 'THC, CBD'),
('CNB000076', 'Aurora', 'Lemon Skunk Shatter', 'High potency shatter concentrate of Lemon Skunk strain.', 0.5, 'Shatter', 'Concentrates', 'Shatter', 24, 42.00, 'THC'),
('CNB000077', 'Canopy', 'Blue Cheese Diamonds', 'Premium diamonds concentrate of Blue Cheese strain.', 0.5, 'Diamonds', 'Concentrates', 'Diamonds', 12, 47.00, 'THC, CBD'),
('CNB000078', 'Tweed', 'Strawberry Cough Applicator', 'Easy to use applicator of Strawberry Cough concentrate.', 0.5, 'Applicator', 'Concentrates', 'Applicators', 24, 37.00, 'THC, CBD'),
('CNB000079', 'Tilray', 'Granddaddy Purple Resin', 'High quality resin of Granddaddy Purple strain.', 0.5, 'Resin', 'Concentrates', 'Resin', 12, 52.00, 'THC, CBD'),
('CNB000080', 'Hexo', 'AK-47 Rosin', 'Premium rosin of AK-47 strain.', 0.5, 'Rosin', 'Concentrates', 'Rosin', 24, 47.00, 'THC, CBD'),
('CNB000081', 'Aurora', 'Cherry Pie Chocolates', 'Delicious chocolates infused with Cherry Pie strain.', 0.2, 'Chocolate', 'Edibles', 'Chocolates', 12, 12.00, 'THC, CBD'),
('CNB000082', 'Canopy', 'Lemon Skunk Gummies', 'Tasty gummies infused with Lemon Skunk strain.', 0.2, 'Gummy', 'Edibles', 'Gummies', 24, 10.00, 'THC, CBD'),
('CNB000083', 'Tweed', 'Blue Cheese Hard Candy', 'Hard candies infused with Blue Cheese strain.', 0.2, 'Hard Candy', 'Edibles', 'Hard Candy', 12, 8.50, 'THC, CBD'),
('CNB000084', 'Tilray', 'Strawberry Cough Baked Goods', 'Delicious baked goods infused with Strawberry Cough strain.', 0.3, 'Baked Goods', 'Edibles', 'Baked Goods', 24, 14.00, 'THC, CBD'),
('CNB000085', 'Hexo', 'Granddaddy Purple Beverage', 'Refreshing beverage infused with Granddaddy Purple strain.', 0.5, 'Beverage', 'Edibles', 'Beverages', 12, 12.00, 'THC, CBD'),
('CNB000086', 'Aurora', 'Ceramic Bong', 'High quality ceramic bong for a smooth experience.', 1.0, 'Accessory', 'Accessories', 'Bongs', 24, 60.00, ''),
('CNB000087', 'Canopy', 'Silicone Pipe', 'High quality silicone pipe for a smooth experience.', 0.5, 'Accessory', 'Accessories', 'Pipes', 12, 24.00, ''),
('CNB000088', 'Tweed', 'Organic Rolling Papers', 'Premium organic rolling papers for a perfect roll.', 0.1, 'Accessory', 'Accessories', 'Papers', 24, 2.75, ''),
('CNB000089', 'Tilray', 'Torch Lighter', 'Durable torch lighter for your smoking needs.', 0.2, 'Accessory', 'Accessories', 'Lighters', 12, 4.00, ''),
('CNB000090', 'Hexo', 'Desktop Vaporizer', 'High quality desktop vaporizer for a clean and easy experience.', 0.7, 'Accessory', 'Accessories', 'Vaporizers', 24, 90.00, ''),
('CNB000091', 'Aurora', 'Sativa Infused Pre-roll', 'High quality infused pre-roll of Sativa strain.', 0.5, 'Pre-roll', 'Prerolls', 'Infused', 12, 8.60, 'THC, CBD'),
('CNB000092', 'Canopy', 'Indica Single Pre-roll', 'Premium single pre-roll of Indica strain.', 0.5, 'Pre-roll', 'Prerolls', 'Singles', 24, 7.60, 'THC, CBD'),
('CNB000093', 'Tweed', 'Hybrid Regular Pre-roll', 'Top quality regular pre-roll of Hybrid strain.', 0.5, 'Pre-roll', 'Prerolls', 'Regular', 12, 6.80, 'THC, CBD'),
('CNB000094', 'Tilray', 'Blunt Blunt', 'Delicious blunt pre-roll of Blunt strain.', 0.7, 'Pre-roll', 'Prerolls', 'Blunts', 24, 9.60, 'THC'),
('CNB000095', 'Hexo', 'Dart Dart', 'High potency dart pre-roll of Dart strain.', 0.4, 'Pre-roll', 'Prerolls', 'Darts', 12, 8.90, 'THC, CBD'),
('CNB000096', 'Aurora', 'Hybrid Hybrid Flower', 'High quality hybrid flower of Hybrid strain.', 1.0, 'Flower', 'Flower', 'Hybrid', 24, 10.80, 'THC'),
('CNB000097', 'Canopy', 'Sativa Sativa Flower', 'Premium sativa flower of Sativa strain.', 1.0, 'Flower', 'Flower', 'Sativa', 12, 12.80, 'THC, CBD'),
('CNB000098', 'Tweed', 'Indica Indica Flower', 'Top quality indica flower of Indica strain.', 1.0, 'Flower', 'Flower', 'Indica', 24, 11.30, 'THC, CBD'),
('CNB000099', 'Tilray', 'Hybrid Hybrid Flower', 'High potency hybrid flower of Hybrid strain.', 1.0, 'Flower', 'Flower', 'Hybrid', 12, 11.80, 'THC'),
('CNB000100', 'Hexo', 'Sativa Sativa Flower', 'Pure sativa flower of Sativa strain.', 1.0, 'Flower', 'Flower', 'Sativa', 24, 13.30, 'THC, CBD');


