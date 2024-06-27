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
        const data = await sql`SELECT * FROM c_employee`;
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

export async function PUT(req: Request) {
  const body = await req.json();
  const { emp_id, emp_fname, emp_lname, emp_email, emp_jobtitle, store_id } = body;
  try {
      await sql`UPDATE c_employee 
                SET emp_fname = ${emp_fname}, 
                    emp_lname = ${emp_lname}, 
                    emp_email = ${emp_email}, 
                    emp_jobtitle = ${emp_jobtitle}, 
                    store_id = ${store_id} 
                WHERE emp_id = ${emp_id}`;
      return new Response(JSON.stringify({ message: 'Employee updated successfully' }), {
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

export async function DELETE(req: Request) {
  const body = await req.json();
  const { emp_id } = body;
  try {
      await sql`DELETE FROM c_employee WHERE emp_id = ${emp_id}`;
      return new Response(JSON.stringify({ message: 'Employee deleted successfully' }), {
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