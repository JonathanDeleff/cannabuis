import Search from "@/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/components/dashboard/pagination";
import postgres from "postgres";
import Transaction from "@/components/transactions/transactionRender";

// connect to the database
const sql = postgres({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: 'require',    
});


export default async function TransactionsPage() {
  
    // TODO: requires sql query to also grab customer name
    // get products from database
   const getTransactions = async () => {
    const rows = await sql`SELECT * FROM c_transaction`;
    return rows;
    };

    const transactions = await getTransactions();

    // need to convert response dates to strings to display them properly
    const formattedTransactions = transactions.map(transaction => {
        const formattedTransactions = { ...transaction };

        // format the dates to remove unnecessary time information       
        formattedTransactions.created_at = formattedTransactions.created_at.toISOString().split('T')[0];      
        formattedTransactions.updated_at = formattedTransactions.updated_at.toISOString().split('T')[0];

        // calculate the total cost of the transaction
        const total = parseFloat(formattedTransactions.transaction_cost) + parseFloat(formattedTransactions.transaction_tax);
        formattedTransactions.total = total.toFixed(2);
       
        return formattedTransactions;
      });
      
    

  return (
    <div className="bg-bgSoft p-5 rounded-lg mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder='Search for a product' />
        <Link href={"/components/products/addProduct"}>
          <button className="p-2.5 bg-button text-black rounded-lg">Add New</button>
        </Link>
      </div>
        <Transaction transactions={formattedTransactions} />
      <Pagination />
    </div>
  );
}
