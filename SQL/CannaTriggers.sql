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
BEFORE UPDATE ON c_store
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_customer_timestamp
BEFORE UPDATE ON c_customer
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_employee_timestamp
BEFORE UPDATE ON c_employee
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_product_timestamp
BEFORE UPDATE ON c_product
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_inventory_timestamp
BEFORE UPDATE ON c_inventory
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_supplier_timestamp
BEFORE UPDATE ON c_supplier
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_transaction_timestamp
BEFORE UPDATE ON c_transaction
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_order_timestamp
BEFORE UPDATE ON c_order
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS trg_update_inventory_level ON c_transaction_details;

-- Create trigger function to update inventory levels
CREATE OR REPLACE FUNCTION update_inventory_level()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the inventory_level in c_inventory
    UPDATE c_inventory
    SET inventory_level = inventory_level - NEW.transaction_quantity,
        updated_at = NOW()
    WHERE product_sku = NEW.product_sku AND store_id = NEW.store_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function on insert
CREATE TRIGGER trg_update_inventory_level
AFTER INSERT ON c_transaction_details
FOR EACH ROW
EXECUTE FUNCTION update_inventory_level();
