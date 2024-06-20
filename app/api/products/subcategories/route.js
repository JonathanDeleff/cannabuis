import sql from '@/app/lib/db';

export async function GET(req) {
  try {
    const products = await sql`SELECT subcategory_id, subcategory_name FROM c_subcategory;`;
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