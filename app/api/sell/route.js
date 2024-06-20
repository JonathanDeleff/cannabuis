import postgres from "postgres";
import { NextResponse } from "next/server";

const sql = postgres({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: 'require',
});

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      customer_id = null,
      transaction_cost,
      transaction_tax,
      transaction_prov,
      payment_method,
      transaction_status,
      cartItems,
    } = body;

    // Temporarily using the main store ID
    const store_id = '19f73af3-ffdf-4706-8afb-025798824c25'; // TODO: Replace with actual store ID on login
    const emp_id = '747e0274-8266-475f-9dfc-7360cd7ce1b4'; // TODO: Replace with actual employee ID

    // Validate required fields
    if (
      !transaction_cost ||
      !transaction_tax ||
      !transaction_prov ||
      !payment_method ||
      !transaction_status ||
      !store_id ||
      !cartItems
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Start a transaction
    await sql.begin(async (sql) => {
      // Insert into c_transaction
      const transactionResult = await sql`
        INSERT INTO c_transaction (
          transaction_cost, customer_id, transaction_tax, transaction_prov, 
          emp_id, payment_method, transaction_status, store_id
        ) VALUES (
          ${transaction_cost}, ${customer_id}, ${transaction_tax}, ${transaction_prov}, 
          ${emp_id}, ${payment_method}, ${transaction_status}, ${store_id}
        ) RETURNING transaction_id;
      `;

      const transaction_id = transactionResult[0].transaction_id;

      // Insert into c_transaction_details and update c_inventory
      for (const item of cartItems) {
        const { product_sku, transaction_quantity, transaction_cost } = item;

        // Validate required fields for cart item
        if (!product_sku) {
          throw new Error(`Missing required field 'product_sku' in cart item: ${JSON.stringify(item)}`);
        }
        if (!transaction_quantity) {
          throw new Error(`Missing required field 'transaction_quantity' in cart item: ${JSON.stringify(item)}`);
        }
        if (!transaction_cost) {
          throw new Error(`Missing required field 'transaction_cost' in cart item: ${JSON.stringify(item)}`);
        }

        // Insert into c_transaction_details
        await sql`
          INSERT INTO c_transaction_details (
            transaction_id, product_sku, transaction_quantity, transaction_cost, store_id
          ) VALUES (
            ${transaction_id}, ${product_sku}, ${transaction_quantity}, ${transaction_cost}, ${store_id}
          );
        `;

        // Update c_inventory
        await sql`
          UPDATE c_inventory
          SET inventory_level = inventory_level - ${transaction_quantity},
              updated_at = NOW()
          WHERE product_sku = ${product_sku} AND store_id = ${store_id};
        `;
      }
    });

    return NextResponse.json({ message: 'Transaction completed successfully' }, { status: 201 });
  } catch (error) {
    console.error('Database transaction error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
