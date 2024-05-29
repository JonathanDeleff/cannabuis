import Search from "@/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/components/dashboard/pagination";
import postgres from "postgres";
import Product from "@/components/products/productRender";

// connect to the database
const sql = postgres({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: 'require',    
});


export default async function ProductsPage() {
  
    // get products from database
   const getProducts = async () => {
    const rows = await sql`SELECT * FROM c_product`;
    return rows;
    };

    const products = await getProducts();

    // need to convert response dates to strings to display them properly
    const formattedProducts = products.map(product => {
        const formattedProducts = { ...product };

        // format the dates to remove unnecessary time information       
        formattedProducts.created_at = formattedProducts.created_at.toISOString().split('T')[0];      
        formattedProducts.updated_at = formattedProducts.updated_at.toISOString().split('T')[0];
        return formattedProducts;
      });
      
    

  return (
    <div className="bg-bgSoft p-5 rounded-lg mt-5 max-h-4/5">
      <div className="flex items-center justify-between overflow-auto">
        <Search placeholder='Search for a product' />
        <Link href={"/components/products/addProduct"}>
          <button className="p-2.5 bg-button text-black rounded-lg">Add New</button>
        </Link>
      </div>
        <Product products={formattedProducts} />
      <Pagination />
    </div>
  );
}
