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
    const products = await sql`SELECT 
    p.product_sku,
    p.product_title,
    p.product_brand,
    p.product_description,
    c.category_name,
    sc.subcategory_name,
    COALESCE(i.inventory_level, 0) AS inventory_level,
    COALESCE(i.sell_price, 0) AS sell_price,
    i.discount_price
FROM 
    c_product p
JOIN 
    c_category c ON p.category_id = c.category_id
JOIN 
    c_subcategory sc ON p.subcategory_id = sc.subcategory_id
LEFT JOIN 
    c_inventory i ON p.product_sku = i.product_sku;`;
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
    const { product_sku, product_brand, product_title, product_description, product_weight, product_equivalency, case_size, inventory_level, cost_price, sell_price, discount_price, tags, store_id, category_id, subcategory_id } = body;

    const result = await sql`
      INSERT INTO c_product (
        product_sku, product_brand, product_title, product_description, 
        product_weight, product_equivalency, category_id, subcategory_id, 
        case_size, cost_price, tags
      )
      VALUES (
        ${product_sku}, ${product_brand}, ${product_title}, ${product_description}, 
        ${product_weight}, ${product_equivalency}, ${category_id}, ${subcategory_id}, 
        ${case_size}, ${cost_price}, ${tags}
      )
      RETURNING *;
    `;

    await sql`
      INSERT INTO inventory (
        product_sku, store_id, inventory_level, sell_price, discount_price
      )
      VALUES (
        ${product_sku}, ${store_id}, ${inventory_level}, ${sell_price}, ${discount_price}
      );
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
        category_id = ${category_id},
        subcategory_id = ${subcategory_id},
        case_size = ${case_size},
        inventory_level = ${inventory_level},
        cost_price = ${cost_price},
        tags = ${tags},
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



/**
 * Fetches all categories from the 'c_category' table.
 * Returns a list of categories.
 */
export async function GETCATEGORIES(req, res) {
  try {
      const categories = await sql`SELECT category_name FROM c_category;`;
      res.status(200).json(categories);
  } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
* Fetches all subcategory names from the 'c_subcategory' table.
* Returns a list of subcategory names.
*/
export async function GETSUBCATEGORIES(req, res) {
  try {
      const subcategories = await sql`SELECT subcategory_name FROM c_subcategory;`;
      res.status(200).json(subcategories);
  } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}
