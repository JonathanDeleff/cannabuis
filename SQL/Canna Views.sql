-- Drop existing views if they exist
DROP VIEW IF EXISTS most_sold_items;
DROP VIEW IF EXISTS employee_refunds;
DROP VIEW IF EXISTS most_returned_items;
DROP VIEW IF EXISTS overall_loss_sales;
DROP VIEW IF EXISTS employee_most_items_sold;
DROP VIEW IF EXISTS employee_most_sales;
DROP VIEW IF EXISTS employee_least_sales;
DROP VIEW IF EXISTS peak_hour_sales;
DROP VIEW IF EXISTS low_hour_sales;
DROP VIEW IF EXISTS sales_per_category;
DROP VIEW IF EXISTS daily_vs_weekly_vs_alltime_sales;
DROP VIEW IF EXISTS weekly_sales_by_category;
DROP VIEW IF EXISTS most_sold_item_today;

-- View for Most Sold Items
CREATE VIEW most_sold_items AS
SELECT 
    td.product_sku, 
    SUM(td.transaction_quantity) AS total_sold
FROM 
    c_transaction_details td
GROUP BY 
    td.product_sku
ORDER BY 
    total_sold DESC;

-- View for Employee Refunds
-- Assuming refunds are tracked in a separate table or by a specific status in c_transaction
-- Here we'll assume that refunded transactions are flagged in c_transaction
CREATE VIEW employee_refunds AS
SELECT 
    t.emp_id, 
    COUNT(t.transaction_id) AS total_refunds
FROM 
    c_transaction t
WHERE 
    t.transaction_status = 'refunded'
GROUP BY 
    t.emp_id
ORDER BY 
    total_refunds DESC;

-- View for Most Returned Items
-- Adjusting assumption that returned items are in the same table as sold items
CREATE VIEW most_returned_items AS
SELECT 
    td.product_sku, 
    SUM(td.transaction_quantity) AS total_returned
FROM 
    c_transaction_details td
WHERE 
    td.transaction_id IN (
        SELECT t.transaction_id 
        FROM c_transaction t
        WHERE t.transaction_status = 'returned'
    )
GROUP BY 
    td.product_sku
ORDER BY 
    total_returned DESC;

-- View for Overall Loss of Sales Based on Refunds
CREATE VIEW overall_loss_sales AS
SELECT 
    SUM(t.transaction_cost) AS total_loss
FROM 
    c_transaction t
WHERE 
    t.transaction_status = 'refunded';

-- View for Employee Who Sells the Most Items
CREATE VIEW employee_most_items_sold AS
SELECT 
    t.emp_id, 
    SUM(td.transaction_quantity) AS total_items_sold
FROM 
    c_transaction_details td
JOIN 
    c_transaction t ON td.transaction_id = t.transaction_id
GROUP BY 
    t.emp_id
ORDER BY 
    total_items_sold DESC;

-- View for Employee Who Has the Most Sales
CREATE VIEW employee_most_sales AS
SELECT 
    t.emp_id, 
    SUM(t.transaction_cost) AS total_sales
FROM 
    c_transaction t
GROUP BY 
    t.emp_id
ORDER BY 
    total_sales DESC;

-- View for Employee Who Has the Least Sales
CREATE VIEW employee_least_sales AS
SELECT 
    t.emp_id, 
    SUM(t.transaction_cost) AS total_sales
FROM 
    c_transaction t
GROUP BY 
    t.emp_id
ORDER BY 
    total_sales ASC;

-- View for Peak Hour Sales
CREATE VIEW peak_hour_sales AS
SELECT 
    EXTRACT(HOUR FROM t.created_at) AS hour, 
    SUM(t.transaction_cost) AS total_sales
FROM 
    c_transaction t
GROUP BY 
    EXTRACT(HOUR FROM t.created_at)
ORDER BY 
    total_sales DESC
LIMIT 1;

-- View for Low Hour Sales
CREATE VIEW low_hour_sales AS
SELECT 
    EXTRACT(HOUR FROM t.created_at) AS hour, 
    SUM(t.transaction_cost) AS total_sales
FROM 
    c_transaction t
GROUP BY 
    EXTRACT(HOUR FROM t.created_at)
ORDER BY 
    total_sales ASC
LIMIT 1;

-- View for Sales per Category
CREATE VIEW sales_per_category AS
SELECT 
    p.category AS category_name, 
    SUM(td.transaction_cost) AS total_sales
FROM 
    c_transaction_details td
JOIN 
    c_product p ON td.product_sku = p.product_sku
GROUP BY 
    p.category
ORDER BY 
    total_sales DESC;

-- View to show sales for the day vs highest sales that week in a day, vs highest sales of all time for a day
CREATE VIEW daily_vs_weekly_vs_alltime_sales AS
SELECT 
    CURRENT_DATE AS sales_date,
    (SELECT COALESCE(SUM(t.transaction_cost), 0)
     FROM c_transaction t
     WHERE DATE(t.created_at) = CURRENT_DATE) AS today_sales,
    (SELECT COALESCE(MAX(daily_sales), 0)
     FROM (SELECT DATE(t.created_at) AS sale_date, SUM(t.transaction_cost) AS daily_sales
           FROM c_transaction t
           WHERE DATE(t.created_at) >= date_trunc('week', CURRENT_DATE)
           GROUP BY DATE(t.created_at)) AS weekly_sales) AS highest_sales_this_week,
    (SELECT COALESCE(MAX(daily_sales), 0)
     FROM (SELECT DATE(t.created_at) AS sale_date, SUM(t.transaction_cost) AS daily_sales
           FROM c_transaction t
           GROUP BY DATE(t.created_at)) AS alltime_sales) AS highest_sales_all_time;

-- View to show weekly sales by category
CREATE VIEW weekly_sales_by_category AS
SELECT 
    p.category AS category_name,
    SUM(td.transaction_cost) AS total_sales
FROM 
    c_transaction_details td
JOIN 
    c_product p ON td.product_sku = p.product_sku
JOIN 
    c_transaction t ON td.transaction_id = t.transaction_id
WHERE 
    DATE(t.created_at) >= date_trunc('week', CURRENT_DATE)
GROUP BY 
    p.category
ORDER BY 
    total_sales DESC;

-- View to show the most sold item that day and average sale cost
CREATE VIEW most_sold_item_today AS
SELECT 
    td.product_sku,
    SUM(td.transaction_quantity) AS total_quantity_sold,
    AVG(td.transaction_cost / td.transaction_quantity) AS average_sale_cost
FROM 
    c_transaction_details td
JOIN 
    c_transaction t ON td.transaction_id = t.transaction_id
WHERE 
    DATE(t.created_at) = CURRENT_DATE
GROUP BY 
    td.product_sku
ORDER BY 
    total_quantity_sold DESC
LIMIT 1;


-- Drop the existing view if it exists
DROP VIEW IF EXISTS inventory_levels;

-- Create the view to check inventory levels of all stock
CREATE VIEW inventory_levels AS
SELECT 
    i.inventory_id,
    i.product_sku,
    p.product_brand,
    p.product_title,
    p.category,
    p.subcategory,
    i.store_id,
    s.store_name,
    i.inventory_level,
    i.sell_price,
    i.discount_price,
    i.created_at,
    i.updated_at
FROM 
    c_inventory i
JOIN 
    c_product p ON i.product_sku = p.product_sku
JOIN 
    c_store s ON i.store_id = s.store_id
ORDER BY 
    p.category, 
    p.subcategory, 
    p.product_brand, 
    p.product_title;
