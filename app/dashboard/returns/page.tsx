"use client"
import { useState, useEffect } from "react";
import { ProductType } from "@/app/types/dashboardTypes/types";

const ReturnsPage = () => {
    
    const [products, setProducts] = useState<ProductType[]>([]);
    const [session, setSession] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    

    useEffect(() => {
        
        const fetchSession = async () => {
            try {
                const response = await fetch('/api/session');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setSession(data);
              } catch (error) {
                console.error('Error fetching session:', error);
              }
        }
        
        const fetchProducts = async () => {
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

        fetchSession();
        fetchProducts();
      }, []);
    
    return (
        <main className="flex gap mt-5 flex-col">
            <div className="bg-bgSoft p-5 rounded-lg mt-5 max-h-4/5 w-full">
                <h1>Returns</h1>
            </div>
        </main>
    );
}

export default ReturnsPage;