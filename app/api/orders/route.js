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
        c_order.order_id, 
        c_order.order_date, 
        c_order.order_status, 
        order_details.order_cost
    FROM 
        c_order
    JOIN 
        order_details ON c_order.order_id = order_details.order_id;`;
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