import sql from "@/app/services/dbService";


export async function POST(req: Request, res: Response) {
  
    const { customer_fname, customer_lname, customer_email, customer_phone, street_address, city, province, postal_code, store_id } = await req.json();

    try {
      const newCustomer = await sql`
        INSERT INTO customers (customer_fname, customer_lname, customer_email, customer_phone, street_address, city, province, postal_code, store_id)
        VALUES (${customer_fname}, ${customer_lname}, ${customer_email}, ${customer_phone}, ${street_address}, ${city}, ${province}, ${postal_code}, ${store_id})
        RETURNING *;
      `;

      return new Response(JSON.stringify(newCustomer), {
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
