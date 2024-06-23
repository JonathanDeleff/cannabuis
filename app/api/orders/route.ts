import postgres from "postgres";

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
        const data = await sql`SELECT 
          c_order.order_id, 
          c_order.order_date, 
          c_order.order_status,
          c_order_details.order_cost,
          c_order_details.order_item_id,
          c_order_details.product_sku,
          c_order_details.order_quantity
      FROM 
          c_order
      JOIN 
          c_order_details ON c_order.order_id = c_order_details.order_id`
        return new Response(JSON.stringify(data), {
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