"use client";
import React, { useState, useEffect } from 'react';
import { useProducts } from '@/app/contexts/ProductsContext';
import { useSession } from '@/app/contexts/SessionContext';
import Return from '@/app/components/returns/return';
import { Search } from '@/app/components/dashboard/search';
import type { ProductType } from '@/app/types/dashboardTypes/types';

const ReturnsPage = () => {
  const { products, loading: productsLoading } = useProducts();
  const { session, loading: sessionLoading } = useSession();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.product_title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  if (productsLoading || sessionLoading) return <div>Loading...</div>;

  return (
    <main className="bg-bgSoft p-5 rounded-lg mt-5 max-h-full w-full">
      <div className="flex">
        <Search placeholder="Search for a product" setSearchQuery={setSearchQuery} />
      </div>
      <div className="flex">
        <Return products={filteredProducts} />
      </div>
    </main>
  );
};

export default ReturnsPage;
