import postgres from "postgres";
import { OrderType } from "@/app/types/dashboardTypes/types";

const sql = postgres({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: 'require',
});



export async function GET() {
  try {
    const data = await sql`
      SELECT 
        c_order.order_id, 
        c_order.order_date, 
        c_order.order_status,
        c_order_details.order_cost,
        c_order_details.order_item_id,
        c_order_details.product_sku,
        c_order_details.order_quantity,
        c_order.store_id,
        c_product.cost_price AS order_item_cost,
        c_product.product_title
      FROM 
        c_order
      JOIN 
        c_order_details ON c_order.order_id = c_order_details.order_id
      JOIN 
        c_product ON c_order_details.product_sku = c_product.product_sku`;

    // Transform the flat data into the nested structure
    const ordersMap: { [key: string]: OrderType } = {};

    data.forEach((row) => {
      const {
        order_id,
        order_date,
        order_status,
        order_cost,
        order_item_id,
        product_sku,
        order_quantity,
        store_id,
        order_item_cost,
        product_title
      } = row;

      if (!ordersMap[order_id]) {
        ordersMap[order_id] = {
          order_id,
          order_date,
          order_status,
          order_cost,
          order_items: [],
          store_id
        };
      }

      ordersMap[order_id].order_items.push({
        order_item_id,
        product_sku,
        product_title,
        order_quantity,
        order_item_cost,
      });
    });

    const orders = Object.values(ordersMap);

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
