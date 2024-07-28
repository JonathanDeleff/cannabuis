import { OrderType } from "@/app/types/dashboardTypes/types";
import { NextResponse } from "next/server";
import sql from "@/app/services/dbService";

export async function GET() {
  try {
    const data = await sql`
      SELECT 
        c_order.order_id, 
        c_order.order_date, 
        c_order.order_status,
        c_order_details.order_cost,
        c_order_details.order_item_id,
        c_order_details.product_sku,
        c_order_details.order_quantity,
        c_order.store_id,
        c_product.cost_price AS order_item_cost,
        c_product.product_title
      FROM 
        c_order
      JOIN 
        c_order_details ON c_order.order_id = c_order_details.order_id
      JOIN 
        c_product ON c_order_details.product_sku = c_product.product_sku`;

    // Transform the flat data into the nested structure
    const ordersMap: { [key: string]: OrderType } = {};

    data.forEach((row) => {
      const {
        order_id,
        order_date,
        order_status,
        order_cost,
        order_item_id,
        product_sku,
        order_quantity,
        store_id,
        order_item_cost,
        product_title
      } = row;

      if (!ordersMap[order_id]) {
        ordersMap[order_id] = {
          order_id,
          order_date,
          order_status,
          order_cost,
          order_items: [],
          store_id
        };
      }

      ordersMap[order_id].order_items.push({
        order_item_id,
        product_sku,
        product_title,
        order_quantity,
        order_item_cost,
      });
    });

    const orders = Object.values(ordersMap);

    return new Response(JSON.stringify(orders), {
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      order_date,
      order_status,
      order_items,
    } = body;

    // Temporarily using the main store ID
    const store_id = '19f73af3-ffdf-4706-8afb-025798824c25'; // TODO: Replace with actual store ID on login
    const supplier_id = '5ea77822-cac0-446a-9c9e-521ae4b2ac81'; // TODO: Replace with actual supplier ID

    // Validate required fields
    if (
      !order_date ||
      !order_status ||
      !order_items ||
      !store_id ||
      !supplier_id
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Start a transaction
    await sql.begin(async (sql) => {
      // Insert into c_order
      const orderResult = await sql`
        INSERT INTO c_order (
          order_id, supplier_id, order_date, order_status, store_id
        ) VALUES (
          uuid_generate_v4(), ${supplier_id}, ${order_date}, ${order_status}, ${store_id}
        ) RETURNING order_id;
      `;

      const order_id = orderResult[0].order_id;

      // Insert into c_order_details
      for (const item of order_items) {
        const { product_sku, order_quantity, order_cost } = item;

        // Validate required fields for cart item
        if (!product_sku) {
          throw new Error(`Missing required field 'product_sku' in order item: ${JSON.stringify(item)}`);
        }
        if (!order_quantity) {
          throw new Error(`Missing required field 'order_quantity' in order item: ${JSON.stringify(item)}`);
        }
        if (!order_cost) {
          throw new Error(`Missing required field 'order_cost' in order item: ${JSON.stringify(item)}`);
        }

        // Insert into c_order_details using the same order_id
        await sql`
          INSERT INTO c_order_details (
            order_item_id, order_id, product_sku, order_quantity, order_cost, store_id
          ) VALUES (
            uuid_generate_v4(), ${order_id}, ${product_sku}, ${order_quantity}, ${order_cost}, ${store_id}
          );
        `;
      }
    });

    return NextResponse.json({ message: 'Transaction completed successfully' }, { status: 201 });
  } catch (error) {
    console.error('Database transaction error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

