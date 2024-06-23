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
    const products = await sql`
      SELECT 
        p.product_sku,
        p.product_brand,
        p.product_title,
        p.product_description,
        p.product_weight,
        p.product_equivalency,
        p.category,
        p.subcategory,
        p.case_size,
        p.cost_price,
        p.tags,
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


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      product_sku, product_brand, product_title, product_description,
      product_weight, product_equivalency, category, subcategory,
      case_size, inventory_level, cost_price, sell_price, discount_price,
      tags, store_id
    } = body;

    // Check for missing required fields
    if (!product_sku || !product_brand || !product_title || !product_description || !product_weight || !product_equivalency || !category || !subcategory || !case_size || !inventory_level || !cost_price || !sell_price || !discount_price || !tags || !store_id) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert into c_product table
    let productResult;
    try {
      productResult = await sql`
        INSERT INTO c_product (
          product_sku, product_brand, product_title, product_description, 
          product_weight, product_equivalency, category, subcategory, 
          case_size, cost_price, tags
        )
        VALUES (
          ${product_sku}, ${product_brand}, ${product_title}, ${product_description}, 
          ${product_weight}, ${product_equivalency}, ${category}, ${subcategory}, 
          ${case_size}, ${cost_price}, ${tags}
        )
        RETURNING *;
      `;
    } catch (err) {
      console.error('Error inserting into c_product:', err);
      return new Response(JSON.stringify({ error: 'Error inserting into c_product' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert into c_inventory table
    try {
      await sql`
        INSERT INTO c_inventory (
          product_sku, store_id, inventory_level, sell_price, discount_price
        )
        VALUES (
          ${product_sku}, ${store_id}, ${inventory_level}, ${sell_price}, ${discount_price}
        );
      `;
    } catch (err) {
      console.error('Error inserting into c_inventory:', err);
      return new Response(JSON.stringify({ error: 'Error inserting into c_inventory' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(productResult), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Error processing request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}