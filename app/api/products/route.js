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
    const products = await sql`SELECT * FROM c_product`;
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

export async function POST(req) {
  try {
    const body = await req.json();
    const { product_sku, product_brand, product_title, product_description, product_weight, product_equivalency, category_name, category_description, subcategory_name, subcategory_description, case_size, inventory_level, cost_price, sell_price, discount_price, tags, store_id } = body;

    const result = await sql`
      INSERT INTO c_product (product_sku, product_brand, product_title, product_description, product_weight, product_equivalency, category_name, category_description, subcategory_name, subcategory_description, case_size, inventory_level, cost_price, sell_price, discount_price, tags, store_id)
      VALUES (${product_sku}, ${product_brand}, ${product_title}, ${product_description}, ${product_weight}, ${product_equivalency}, ${category_name}, ${category_description}, ${subcategory_name}, ${subcategory_description}, ${case_size}, ${inventory_level}, ${cost_price}, ${sell_price}, ${discount_price}, ${tags}, ${store_id})
      RETURNING *;
    `;

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database insertion error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { product_sku, product_brand, product_title, product_description, product_weight, product_equivalency, category_name, category_description, subcategory_name, subcategory_description, case_size, inventory_level, cost_price, sell_price, discount_price, tags, store_id } = body;

    const result = await sql`
      UPDATE c_product
      SET 
        product_brand = ${product_brand},
        product_title = ${product_title},
        product_description = ${product_description},
        product_weight = ${product_weight},
        product_equivalency = ${product_equivalency},
        category_name = ${category_name},
        category_description = ${category_description},
        subcategory_name = ${subcategory_name},
        subcategory_description = ${subcategory_description},
        case_size = ${case_size},
        inventory_level = ${inventory_level},
        cost_price = ${cost_price},
        sell_price = ${sell_price},
        discount_price = ${discount_price},
        tags = ${tags},
        store_id = ${store_id}
      WHERE product_sku = ${product_sku}
      RETURNING *;
    `;

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database update error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
 