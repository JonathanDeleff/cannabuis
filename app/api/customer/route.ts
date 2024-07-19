import { NextApiRequest, NextApiResponse } from 'next';
import postgres from 'postgres';

const sql = postgres({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: 'require',
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  
    const { customer_fname, customer_lname, customer_email, customer_phone, street_address, city, province, postal_code, store_id } = req.body;

    try {
      const newCustomer = await sql`
        INSERT INTO customers (customer_fname, customer_lname, customer_email, customer_phone, street_address, city, province, postal_code, store_id)
        VALUES (${customer_fname}, ${customer_lname}, ${customer_email}, ${customer_phone}, ${street_address}, ${city}, ${province}, ${postal_code}, ${store_id})
        RETURNING *;
      `;

      res.status(200).json(newCustomer[0]);
    } catch (error) {
      console.error('Error adding customer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
