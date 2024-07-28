import sql from "@/app/services/dbService";

export async function GET() {
    try {
        const data = await sql`SELECT store_id, store_name FROM c_store`;
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