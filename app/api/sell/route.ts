import sql from "@/app/services/dbService";

export async function POST(req: Request) {

  const {
    customer_id = null,
    transaction_cost,
    transaction_tax,
    transaction_prov,
    payment_method,
    transaction_status,
    cartItems,
    store_id,
    employee_id,
  } = await req.json();

  try {
    // Insert into c_transaction
    const transactionResult = await sql`
      INSERT INTO c_transaction (
        transaction_cost, customer_id, transaction_tax, transaction_prov, 
        emp_id, payment_method, transaction_status, store_id
      ) VALUES (
        ${transaction_cost}, ${customer_id}, ${transaction_tax}, ${transaction_prov}, 
        ${employee_id}, ${payment_method}, ${transaction_status}, ${store_id}
      ) RETURNING transaction_id;
    `;

    const transaction_id = transactionResult[0].transaction_id;

    // Insert into c_transaction_details and update c_inventory
    for (const item of cartItems) {
      const { product_sku, transaction_quantity, transaction_cost } = item;

      // Insert into c_transaction_details using the same transaction_id
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

    return new Response(JSON.stringify(transactionResult), {
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
