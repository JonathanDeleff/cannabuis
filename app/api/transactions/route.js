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
    td.transaction_cost AS transaction_cost,
    ct.transaction_tax AS transaction_tax,
    c.customer_fname AS customer_fname,
    c.customer_lname AS customer_lname,
    ts.status_name AS transaction_status,
    ct.created_at AS created_at
FROM
    c_transaction ct
JOIN
    transaction_details td ON ct.transaction_id = td.transaction_id
JOIN
    transaction_status ts ON ct.transaction_status_id = ts.status_id
JOIN
    c_customer c ON ct.customer_id = c.customer_id;`;
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