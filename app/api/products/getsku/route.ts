import postgres from "postgres";

const sql = postgres({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: 'require',    
});

export async function GET(req: Request) {
    try {
         
        const { searchParams } = new URL(req.url);
        const productSku = searchParams.get('product_sku');

        if (!productSku) {
            return new Response(JSON.stringify({ error: 'Product SKU is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const data = await sql`SELECT * FROM c_product WHERE product_sku = ${productSku}`;

        if (data.length === 0) {
            return new Response(JSON.stringify({ error: 'Product not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(data[0]), {
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