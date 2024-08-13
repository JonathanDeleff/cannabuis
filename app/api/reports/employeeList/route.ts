import sql from "@/app/services/dbService";

export async function GET() {
    try {
        const data = await sql`SELECT emp_id, emp_fname, emp_lname, emp_email, emp_jobtitle, date_of_hire, c_employee.store_id, store_name 
        FROM c_employee
        JOIN c_store ON c_employee.store_id = c_store.store_id`;
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