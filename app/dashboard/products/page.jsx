"use client";
import Search from "@/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/components/dashboard/pagination";
import { useState, useEffect, useMemo } from "react";
import Product from "@/components/products/productRender";
import Cart from "@/components/products/shoppingCart";
import Confirm from "@/components/products/confirmPage";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [confirm, setConfirm] = useState(false);

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

  const cartEmpty = () => cart === undefined || cart.length == 0;
  
  function totalCost() {
    let total = 0;

    if (!cartEmpty()) {
      cart.forEach((product) => total += product.sell_price * product.inventory_level);
    }
    
    return total;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleQuantityChange = (productSKU, newQuantity) => {
    setCart(currentProducts => currentProducts.map(product => {
      if (product.product_sku === productSKU) {
        return { ...product, inventory_level: newQuantity };
      }
      return product;
    }));
  };

  const handleAddToCart = (product) => {
    let canAdd = true;

    cart.every(cartItem => {
      if (product.product_sku === cartItem.product_sku) {
        canAdd = false;
      }

      return canAdd;
    });

    if (canAdd) {
      setCart((prevProducts) => [...prevProducts, { ...product, inventory_level: 1 }]);
    }
  };

  const handleRemoveFromCart = (product_sku) => setCart(cart.filter((product) => product.product_sku !== product_sku));

  const handleClearCart = () => {
    setCart([]);
    setConfirm(false);
  }

  const handleConfirmSell = () => {
    // database code here iirc
    // cart.forEach((product) => DATA BASE QUERY HERE);
    handleClearCart();
  }

  return (
    <div className="flex gap-2 mt-5">
        <div className="bg-bgSoft p-5 rounded-lg mt-5 max-h-4/5 w-4/5">
          <div className="flex items-center justify-between overflow-auto">
            <Search placeholder='Search for a product' setSearchQuery={setSearchQuery} />
            <Link href={"/components/products/addProduct"}>
              <button className="p-2.5 bg-button text-black rounded-lg">Add New</button>
            </Link>
          </div>
          <Product 
            products={sortedProducts} 
            onAddToCart={handleAddToCart} 
            requestSort={requestSort} 
            sortConfig={sortConfig} 
          />
          <Pagination />
        </div>
        <div className="bg-bgSoft p-5 rounded-lg mt-5 max-h-4/5 w-1/5">
            <Cart 
              products={cart} 
              onRemoveFromCart={handleRemoveFromCart} 
              handleQuantityChange={handleQuantityChange}
            />
            {cartEmpty() ? (
              <p className="p-2.5">Cart is empty</p>
            ) : (
              <div className="flex flex-col items-center">
                <p className="p-2.5">Total Cost: ${totalCost()}</p>
                <button 
                  className="p-2.5 bg-button text-black rounded-lg" 
                  onClick={() => handleClearCart()}
                >
                  Clear Cart
                </button>
                {confirm ? (
                  <Confirm 
                    onConfirm={handleConfirmSell}
                    onCancel={() => setConfirm(false)}
                  />
                ) : (
                  <button 
                    className="mt-1 p-2.5 bg-button text-black rounded-lg" 
                    onClick={() => setConfirm(true)}
                  >
                    Sell Items
                  </button>
                )}
              </div>
            )}
        </div>
    </div>
  );
}
