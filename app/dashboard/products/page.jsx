"use client";
import Search from "@/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/components/dashboard/pagination";
import { useState, useEffect, useMemo } from "react";
import Product from "@/components/products/productRender";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

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

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];

    if (sortConfig.key) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableProducts.filter(product =>
      product.product_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_equivalency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, sortConfig, searchQuery]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-bgSoft p-5 rounded-lg mt-5 max-h-4/5">
      <div className="flex items-center justify-between">
        <Search placeholder='Search for a product' setSearchQuery={setSearchQuery} />
        <Link href={"/components/products/addProduct"}>
          <button className="p-2.5 bg-button text-white rounded-lg">Add New</button>
        </Link>
      </div>
        <Product 
          products={sortedProducts} 
          onAddToCart={() => {}} 
          requestSort={requestSort} 
          sortConfig={sortConfig} 
        />
      <Pagination />
    </div>
  );
}
