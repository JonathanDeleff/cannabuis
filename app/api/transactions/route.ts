import type { TransactionType } from "@/app/types/dashboardTypes/types";
import sql from "@/app/services/dbService";


// GET function to fetch data
export async function GET() {
    try {
        // Execute SQL query
        const data = await sql`
            SELECT
                t.transaction_id AS transaction_id,
                t.transaction_cost AS transaction_cost,
                t.transaction_tax AS transaction_tax,
                COALESCE(c.customer_fname, '') AS customer_fname,
                COALESCE(c.customer_lname, '') AS customer_lname,
                t.transaction_status,
                t.created_at AS transaction_date,
                td.transaction_item_id AS transaction_item_id,
                td.product_sku AS product_sku,
                td.transaction_quantity AS transaction_quantity
            FROM
                c_transaction t
            LEFT JOIN
                c_transaction_details td ON t.transaction_id = td.transaction_id
            LEFT JOIN
                c_customer c ON t.customer_id = c.customer_id;
        `;

        // Process the query result to structure it according to TransactionType
        const formattedData: TransactionType[] = [];

        // Group transactions by transaction_id
        const groupedData = data.reduce((acc: TransactionType[], row) => {
            const {
                transaction_id,
                transaction_cost,
                transaction_tax,
                customer_fname,
                customer_lname,
                transaction_status,
                transaction_date,
                transaction_item_id,
                product_sku,
                transaction_quantity
            } = row;

            // Find the transaction in acc array
            let transaction = acc.find(item => item.transaction_id === transaction_id);

            // If transaction doesn't exist, create a new entry
            if (!transaction) {
                transaction = {
                    transaction_id,
                    transaction_cost,
                    transaction_tax,
                    customer_fname,
                    customer_lname,
                    transaction_status,
                    transaction_date,
                    transaction_items: []
                };
                acc.push(transaction);
            }

            // Add transaction item to transaction_items array
            if (transaction_item_id) {
                // Ensure transaction_id is included in TransactionDetailsType
                transaction.transaction_items.push({
                    transaction_item_id,
                    product_sku,
                    transaction_quantity,
                    transaction_id // Include transaction_id
                });
            }

            return acc;
        }, []);

        return new Response(JSON.stringify(groupedData), {
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
