 
CREATE OR REPLACE FUNCTION process_returns(return_date DATE)
RETURNS VOID AS $$
DECLARE
    return_probability NUMERIC := 0.2; -- 20% chance of a return
    transaction_to_return RECORD;
BEGIN
    IF random() < return_probability THEN
        SELECT td.*
        INTO transaction_to_return
        FROM c_transaction_details td
        JOIN c_transaction t ON td.transaction_id = t.transaction_id
        WHERE t.created_at = return_date
        ORDER BY random()
        LIMIT 1;

        IF FOUND THEN
            UPDATE c_transaction SET transaction_status = 'Returned', updated_at = return_date
            WHERE transaction_id = transaction_to_return.transaction_id;

            UPDATE c_inventory SET inventory_level = inventory_level + transaction_to_return.transaction_quantity, updated_at = return_date
            WHERE product_sku = transaction_to_return.product_sku AND store_id = transaction_to_return.store_id;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;
    