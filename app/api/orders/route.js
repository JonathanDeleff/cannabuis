import postgres from "postgres";

const sql = postgres({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: 'require',    
});

export async function GET(req) {
    try {
        const data = await sql`SELECT 
        c_orders.order_id, 
        c_orders.order_date, 
        c_order_status.status_name, 
        c_order_details.order_cost
    FROM 
        c_orders
    JOIN 
        c_order_details ON c_orders.order_id = c_order_details.order_id
    JOIN
        c_order_status ON c_orders.order_status_id = c_order_status.status_id`
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