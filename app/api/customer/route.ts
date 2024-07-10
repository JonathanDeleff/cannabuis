import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

// Database connection
const sql = postgres({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: 'require',
});

// Function to handle GET requests
export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const searchQuery = searchParams.get('searchQuery');

  if (!searchQuery) {
    return NextResponse.json({ error: 'Missing search query' }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT * FROM c_customer
      WHERE
        customer_fname ILIKE ${'%' + searchQuery + '%'} OR
        customer_lname ILIKE ${'%' + searchQuery + '%'} OR
        customer_email ILIKE ${'%' + searchQuery + '%'} OR
        customer_phone ILIKE ${'%' + searchQuery + '%'} OR
        street_address ILIKE ${'%' + searchQuery + '%'} OR
        city ILIKE ${'%' + searchQuery + '%'} OR
        province ILIKE ${'%' + searchQuery + '%'} OR
        postal_code ILIKE ${'%' + searchQuery + '%'};
    `;

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error searching for customer:', error);
    return NextResponse.json({ error: 'Failed to search for customer' }, { status: 500 });
  }
}

// Function to handle POST requests
export async function POST(req: NextRequest) {
  try {
    const customer = await req.json();
    const {
      customer_fname,
      customer_lname,
      customer_email,
      customer_phone,
      street_address,
      city,
      province,
      postal_code,
      store_id
    } = customer;

    // Insert new customer into the database
    const result = await sql`
      INSERT INTO c_customer (
        customer_fname,
        customer_lname,
        customer_email,
        customer_phone,
        street_address,
        city,
        province,
        postal_code,
        store_id
      ) VALUES (
        ${customer_fname},
        ${customer_lname},
        ${customer_email},
        ${customer_phone},
        ${street_address},
        ${city},
        ${province},
        ${postal_code},
        ${store_id}
      ) RETURNING *;
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error adding customer:', error);
    return NextResponse.json({ error: 'Failed to add customer' }, { status: 500 });
  }
}
