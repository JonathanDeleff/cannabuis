import postgres from "postgres";

// Initialize the Postgres connection using environment variables
const sql = postgres({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: { rejectUnauthorized: false }, // Updated to use an object for SSL options
});

export async function GET() {
    try {
        // Fetch weekly sales by category from the database
        const data = await sql`
            SELECT 
                p.category AS category_name,
                SUM(td.transaction_cost) AS total_sales
            FROM 
                c_transaction_details td
            JOIN 
                c_product p ON td.product_sku = p.product_sku
            JOIN 
                c_transaction t ON td.transaction_id = t.transaction_id
            WHERE 
                DATE(t.created_at) >= date_trunc('week', CURRENT_DATE)
            GROUP BY 
                p.category
            ORDER BY 
                total_sales DESC;
        `;
        
        // Return the data as a JSON response
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        // Log any errors and return an internal server error response
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
