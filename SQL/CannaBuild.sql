-- Drop existing tables if they exist with CASCADE to drop dependent objects too
DROP TABLE IF EXISTS c_transaction_details CASCADE;
DROP TABLE IF EXISTS c_order_details CASCADE;
DROP TABLE IF EXISTS c_inventory CASCADE;
DROP TABLE IF EXISTS c_transaction CASCADE;
DROP TABLE IF EXISTS c_order CASCADE;
DROP TABLE IF EXISTS c_supplier CASCADE;
DROP TABLE IF EXISTS c_product CASCADE;
DROP TABLE IF EXISTS c_employee CASCADE;
DROP TABLE IF EXISTS c_customer CASCADE;
DROP TABLE IF EXISTS c_store CASCADE;
DROP TABLE IF EXISTS c_transaction_status CASCADE;
DROP TABLE IF EXISTS c_order_status CASCADE;
DROP TABLE IF EXISTS c_category CASCADE;
DROP TABLE IF EXISTS c_subcategory CASCADE;

-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the c_store table
CREATE TABLE c_store (
    store_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_name VARCHAR(100) NOT NULL,
    store_address VARCHAR(150),
    store_city VARCHAR(50),
    store_province VARCHAR(50),
    store_postal_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enhanced c_customer table with address details and store_id
CREATE TABLE c_customer (
    customer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_fname VARCHAR(50) NOT NULL,
    customer_lname VARCHAR(50) NOT NULL,
    customer_email VARCHAR(100) NOT NULL UNIQUE,
    customer_phone VARCHAR(15),
    street_address VARCHAR(100),
    city VARCHAR(50),
    province VARCHAR(50),
    postal_code VARCHAR(10),
    is_primary_address BOOLEAN DEFAULT TRUE,
    store_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES c_store(store_id)
);

-- c_employee table with necessary details and password
CREATE TABLE c_employee (
    emp_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    emp_fname VARCHAR(50) NOT NULL,
    emp_lname VARCHAR(50) NOT NULL,
    emp_email VARCHAR(100) NOT NULL UNIQUE,
    emp_jobtitle VARCHAR(50) NOT NULL,
    date_of_hire DATE,
    password VARCHAR(255) NOT NULL,
    store_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES c_store(store_id)
);

-- c_product table with manual input SKU and flattened category structure
CREATE TABLE c_product (
    product_sku VARCHAR(20) PRIMARY KEY,
    product_brand VARCHAR(100) NOT NULL,
    product_title VARCHAR(100) NOT NULL,
    product_description TEXT,
    product_weight DECIMAL(10, 2) CHECK (product_weight >= 0),
    product_equivalency VARCHAR(50),
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50) NOT NULL,
    case_size INT CHECK (case_size > 1),
    cost_price DECIMAL(10, 2) NOT NULL CHECK (cost_price >= 0),
    tags VARCHAR(150),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- c_inventory table with product_sku, store_id, inventory_level, sell_price, and discount_price
CREATE TABLE c_inventory (
    inventory_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_sku VARCHAR(20),
    store_id UUID,
    inventory_level INT NOT NULL,
    sell_price DECIMAL(10, 2) NOT NULL CHECK (sell_price >= 0),
    discount_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_sku) REFERENCES c_product(product_sku),
    FOREIGN KEY (store_id) REFERENCES c_store(store_id)
);

-- Enhanced c_supplier table with additional contact details and store_id
CREATE TABLE c_supplier (
    supplier_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_name VARCHAR(100) NOT NULL,
    supplier_email VARCHAR(100) NOT NULL UNIQUE,
    supplier_phone VARCHAR(15),
    contact_person VARCHAR(50),
    supplier_city VARCHAR(50),
    supplier_province VARCHAR(50),
    supplier_website VARCHAR(100),
    store_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES c_store(store_id)
);

-- Enhanced c_transaction table with additional metadata and store_id
CREATE TABLE c_transaction (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_cost DECIMAL(10, 2) NOT NULL,
    customer_id UUID,
    transaction_tax DECIMAL(10, 2) NOT NULL,
    transaction_prov VARCHAR(50),
    emp_id UUID,
    payment_method VARCHAR(50),
    transaction_status VARCHAR(20),
    store_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES c_customer(customer_id),
    FOREIGN KEY (emp_id) REFERENCES c_employee(emp_id),
    FOREIGN KEY (store_id) REFERENCES c_store(store_id)
);

-- Enhanced c_order table with status and last modified timestamp and store_id
CREATE TABLE c_order (
    order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id UUID,
    order_date DATE NOT NULL,
    order_status VARCHAR(20),
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    store_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES c_supplier(supplier_id),
    FOREIGN KEY (store_id) REFERENCES c_store(store_id)
);

-- c_order_details table with store_id
CREATE TABLE c_order_details (
    order_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID,
    product_sku VARCHAR(20),
    order_quantity INT NOT NULL,
    order_cost DECIMAL(10, 2) NOT NULL,
    store_id UUID,
    FOREIGN KEY (order_id) REFERENCES c_order(order_id),
    FOREIGN KEY (product_sku) REFERENCES c_product(product_sku),
    FOREIGN KEY (store_id) REFERENCES c_store(store_id)
);

-- c_transaction_details table with store_id
CREATE TABLE c_transaction_details (
    transaction_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID,
    product_sku VARCHAR(20),
    transaction_quantity INT NOT NULL,
    transaction_cost DECIMAL(10, 2) NOT NULL,
    store_id UUID,
    FOREIGN KEY (transaction_id) REFERENCES c_transaction(transaction_id),
    FOREIGN KEY (product_sku) REFERENCES c_product(product_sku),
    FOREIGN KEY (store_id) REFERENCES c_store(store_id)
);

-- Create necessary indexes
CREATE INDEX idx_product_sku ON c_product(product_sku);
CREATE INDEX idx_store_id ON c_inventory(store_id);
CREATE INDEX idx_customer_id ON c_transaction(customer_id);
CREATE INDEX idx_emp_id ON c_transaction(emp_id);
CREATE INDEX idx_transaction_id ON c_transaction_details(transaction_id);
CREATE INDEX idx_order_id ON c_order_details(order_id);

-- Composite indexes for frequently joined columns
CREATE INDEX idx_transaction_product ON c_transaction_details(transaction_id, product_sku);

-- Adjust nullable constraints on c_transaction
ALTER TABLE c_transaction
  ALTER COLUMN customer_id DROP NOT NULL,
  ALTER COLUMN emp_id DROP NOT NULL,
  ALTER COLUMN transaction_status DROP NOT NULL,
  ALTER COLUMN store_id DROP NOT NULL;

-- Add unique constraint to c_inventory table
ALTER TABLE c_inventory ADD CONSTRAINT c_inventory_product_store_unique UNIQUE (product_sku, store_id);

ALTER TABLE c_customer ALTER COLUMN store_id DROP NOT NULL;

