-- Drop existing tables if they exist
DROP TABLE IF EXISTS Transaction_Details;
DROP TABLE IF EXISTS Order_Details;
DROP TABLE IF EXISTS C_Transaction;
DROP TABLE IF EXISTS C_Order;
DROP TABLE IF EXISTS C_Supplier;
DROP TABLE IF EXISTS C_Product;
DROP TABLE IF EXISTS C_Employee;
DROP TABLE IF EXISTS C_Customer;
DROP TABLE IF EXISTS C_Store;

-- Create the C_Store table
CREATE TABLE C_Store (
    store_ID VARCHAR(50) PRIMARY KEY,
    store_name VARCHAR(100) NOT NULL,
    store_address VARCHAR(150),
    store_city VARCHAR(50),
    store_state VARCHAR(50),
    store_postal_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enhanced C_Customer table with address details and store_ID
CREATE TABLE C_Customer (
    customer_ID VARCHAR(50) PRIMARY KEY,
    customer_Fname VARCHAR(50) NOT NULL,
    customer_Lname VARCHAR(50) NOT NULL,
    customer_email VARCHAR(100) NOT NULL UNIQUE,
    customer_phone VARCHAR(15),
    street_address VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    postal_code VARCHAR(10),
    is_primary_address BOOLEAN DEFAULT TRUE,
    store_ID VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_ID) REFERENCES C_Store(store_ID)
);

-- C_Employee table with necessary details and password
CREATE TABLE C_Employee (
    Emp_ID VARCHAR(50) PRIMARY KEY,
    Emp_Fname VARCHAR(50) NOT NULL,
    Emp_Lname VARCHAR(50) NOT NULL,
    Emp_email VARCHAR(100) NOT NULL UNIQUE,
    Emp_jobtitle VARCHAR(50) NOT NULL,
    date_of_hire DATE,
    password VARCHAR(255) NOT NULL,
    store_ID VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_ID) REFERENCES C_Store(store_ID)
);

-- C_Product table with store_ID
CREATE TABLE C_Product (
    product_SKU VARCHAR(50) PRIMARY KEY,
    product_brand VARCHAR(100) NOT NULL,
    product_title VARCHAR(100) NOT NULL,
    product_description TEXT,
    product_weight DECIMAL(10, 2) CHECK (product_weight >= 0),
    product_equivalency VARCHAR(50),
    category_name VARCHAR(50),
    category_description TEXT,
    subcategory_name VARCHAR(50),
    subcategory_description TEXT,
    case_size INT CHECK (case_size > 1),
    inventory_level INT NOT NULL,
    cost_price DECIMAL(10, 2) NOT NULL CHECK (cost_price >= 0),
    sell_price DECIMAL(10, 2) NOT NULL CHECK (sell_price >= 0),
    discount_price DECIMAL(10, 2) CHECK (discount_price >= 0),
    tags VARCHAR(150),
    store_ID VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_ID) REFERENCES C_Store(store_ID)
);

-- Enhanced C_Supplier table with additional contact details and store_ID
CREATE TABLE C_Supplier (
    supplier_ID VARCHAR(50) PRIMARY KEY,
    supplier_Name VARCHAR(100) NOT NULL,
    supplier_email VARCHAR(100) NOT NULL UNIQUE,
    supplier_phone VARCHAR(15),
    contact_person VARCHAR(50),
    supplier_city VARCHAR(50),
    supplier_province VARCHAR(50),
    supplier_website VARCHAR(100),
    store_ID VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_ID) REFERENCES C_Store(store_ID)
);

-- Enhanced C_Transaction table with additional metadata and store_ID
CREATE TABLE C_Transaction (
    transaction_ID VARCHAR(50) PRIMARY KEY,
    transaction_cost DECIMAL(10, 2) NOT NULL CHECK (transaction_cost >= 0),
    customer_ID VARCHAR(50),
    transaction_tax DECIMAL(10, 2) NOT NULL CHECK (transaction_tax >= 0),
    transaction_prov VARCHAR(50),
    emp_ID VARCHAR(50),
    payment_method VARCHAR(50),
    transaction_status VARCHAR(20) DEFAULT 'Pending',
    store_ID VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_ID) REFERENCES C_Customer(customer_ID),
    FOREIGN KEY (emp_ID) REFERENCES C_Employee(Emp_ID),
    FOREIGN KEY (store_ID) REFERENCES C_Store(store_ID)
);

-- Enhanced C_Order table with status and last modified timestamp and store_ID
CREATE TABLE C_Order (
    order_ID VARCHAR(50) PRIMARY KEY,
    supplier_ID VARCHAR(50),
    order_date DATE NOT NULL,
    order_status VARCHAR(20) DEFAULT 'Pending',
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    store_ID VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_ID) REFERENCES C_Supplier(supplier_ID),
    FOREIGN KEY (store_ID) REFERENCES C_Store(store_ID)
);

-- Order_Details table with store_ID
CREATE TABLE Order_Details (
    order_item_ID VARCHAR(50) PRIMARY KEY,
    order_ID VARCHAR(50),
    product_SKU VARCHAR(50),
    order_quantity INT NOT NULL CHECK (order_quantity > 0),
    order_cost DECIMAL(10, 2) NOT NULL CHECK (order_cost >= 0),
    store_ID VARCHAR(50),
    FOREIGN KEY (order_ID) REFERENCES C_Order(order_ID),
    FOREIGN KEY (product_SKU) REFERENCES C_Product(product_SKU),
    FOREIGN KEY (store_ID) REFERENCES C_Store(store_ID)
);

-- Transaction_Details table with store_ID
CREATE TABLE Transaction_Details (
    transaction_item_ID VARCHAR(50) PRIMARY KEY,
    transaction_ID VARCHAR(50),
    product_SKU VARCHAR(50),
    transaction_quantity INT NOT NULL CHECK (transaction_quantity > 0),
    transaction_cost DECIMAL(10, 2) NOT NULL CHECK (transaction_cost >= 0),
    store_ID VARCHAR(50),
    FOREIGN KEY (transaction_ID) REFERENCES C_Transaction(transaction_ID),
    FOREIGN KEY (product_SKU) REFERENCES C_Product(product_SKU),
    FOREIGN KEY (store_ID) REFERENCES C_Store(store_ID)
);

-- Create trigger functions to update the updated_at columns
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for each table that needs to update the updated_at column
CREATE TRIGGER update_store_timestamp
BEFORE UPDATE ON C_Store
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_customer_timestamp
BEFORE UPDATE ON C_Customer
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_employee_timestamp
BEFORE UPDATE ON C_Employee
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_product_timestamp
BEFORE UPDATE ON C_Product
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_supplier_timestamp
BEFORE UPDATE ON C_Supplier
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_transaction_timestamp
BEFORE UPDATE ON C_Transaction
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_order_timestamp
BEFORE UPDATE ON C_Order
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
