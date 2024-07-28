import sql from "@/app/services/dbService";


export async function GET() {
    try {
      const categories = await sql`SELECT category_id, category_name FROM c_category;`;
      return new Response(JSON.stringify(categories), {
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