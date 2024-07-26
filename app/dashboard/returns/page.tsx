"use client"
import { useState, useEffect } from "react";
import { ProductType } from "@/app/types/dashboardTypes/types";
import  Return from "@/app/components/returns/return";
import { Search } from "@/app/components/dashboard/search";

const ReturnsPage = () => {
    
    const [products, setProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [session, setSession] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    // Use effect to fetch the products and set the session pulling employee info for returns
    useEffect(() => {
        
        // Simple try catch, fetch's from our api to grab the session data
        // Sets session data to session state
        const fetchSession = async () => {
            console.log('Fetching session...');
            try {
                const response = await fetch('/api/session');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setSession(data);
              } catch (error) {
                console.error('Error fetching session:', error);
              }
        }
        
        // Simple fetch works much the same as the session fetch
        // Sets the products to products state
        const fetchProducts = async () => {
            console.log('Fetching products...');
            try {
                const response = await fetch('/api/products', {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: ProductType[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        // Call the fetch functions
        fetchSession();
        fetchProducts();
      }, []);

      useEffect(() => {
        if (searchQuery) {
            const filtered = products.filter(product =>
                product.product_title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [searchQuery, products]);
    
    return (
        <main className="bg-bgSoft p-5 rounded-lg mt-5 max-h-full w-full">
            <div className="flex">
                <Search placeholder="Search for a product" setSearchQuery={setSearchQuery} />
            </div>
            <div className="flex">
            <Return products={filteredProducts}/>
            </div>
        </main>
    );
}

export default ReturnsPage;