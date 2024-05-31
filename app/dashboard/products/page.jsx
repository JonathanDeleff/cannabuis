"use client";
import Search from "@/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/components/dashboard/pagination";
import { useState, useEffect } from "react";
import Product from "@/components/products/productRender";





export default function ProductsPage() {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products', {
          method: 'GET',
        });
        setLoading(false);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-bgSoft p-5 rounded-lg mt-5 max-h-4/5">
      <div className="flex items-center justify-between overflow-auto">
        <Search placeholder='Search for a product' />
        <Link href={"/components/products/addProduct"}>
          <button className="p-2.5 bg-button text-black rounded-lg">Add New</button>
        </Link>
      </div>
      <Product products={products} />
      <Pagination />
    </div>
  );
}