
CREATE OR REPLACE FUNCTION place_restock_orders(order_date DATE)
RETURNS VOID AS $$
DECLARE
    restock_item RECORD;
    restock_threshold_ratio NUMERIC := 0.6;
    supplier_id UUID;
    order_id UUID;
BEGIN
    FOR restock_item IN (SELECT ci.product_sku, ci.sell_price, ci.store_id, cp.case_size
                        FROM c_inventory ci
                        JOIN c_product cp ON ci.product_sku = cp.product_sku
                        WHERE ci.inventory_level < (cp.case_size * restock_threshold_ratio)) LOOP
        SELECT cs.supplier_id INTO supplier_id
        FROM c_supplier cs
        ORDER BY random()
        LIMIT 1;

        INSERT INTO c_order (order_id, supplier_id, order_date, order_status, last_modified, store_id, created_at, updated_at)
        VALUES (uuid_generate_v4(), supplier_id, order_date, 'Pending', order_date, restock_item.store_id, order_date, order_date)
        RETURNING order_id INTO order_id;

        INSERT INTO c_order_details (order_item_id, order_id, product_sku, order_quantity, order_cost, store_id)
        VALUES (uuid_generate_v4(), order_id, restock_item.product_sku, restock_item.case_size, restock_item.case_size * restock_item.sell_price, restock_item.store_id);

        UPDATE c_order SET order_status = 'Received', last_modified = NOW()
        WHERE c_order.order_id = order_id;

        UPDATE c_inventory SET inventory_level = inventory_level + restock_item.case_size, updated_at = NOW()
        WHERE c_inventory.product_sku = restock_item.product_sku AND c_inventory.store_id = restock_item.store_id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
    