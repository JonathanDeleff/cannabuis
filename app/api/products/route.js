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
    const products = await sql`
      SELECT 
        p.product_sku,
        p.product_title,
        p.product_brand,
        p.product_description,
        p.category,
        p.subcategory,
        COALESCE(i.inventory_level, 0) AS inventory_level,
        COALESCE(i.sell_price, 0) AS sell_price,
        i.discount_price
      FROM 
        c_product p
      LEFT JOIN 
        c_inventory i ON p.product_sku = i.product_sku;
    `;
    return new Response(JSON.stringify(products), {
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
