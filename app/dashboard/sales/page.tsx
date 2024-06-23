"use client";
import { Search } from "@/app/components/dashboard/search";
import Pagination from "@/app/components/dashboard/pagination";
import { useState, useEffect, useMemo } from "react";
import Product from "@/app/components/products/productRender";
import Cart from "@/app/components/products/shoppingCart";
import Confirm from "@/app/components/products/confirmPage";
import AddProduct from "@/app/components/products/addProduct";
import { ProductType, SortConfig } from "@/app/types/dashboardTypes/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: 'ascending' });
  const [confirm, setConfirm] = useState<boolean>(false);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<ProductType>({
    product_sku: '',
    product_brand: '',
    product_title: '',
    product_description: '',
    product_weight: '',
    product_equivalency: '',
    category: '',
    subcategory: '',
    case_size: '',
    inventory_level: 0,
    cost_price: 0,
    sell_price: 0,
    discount_price: 0,
    tags: '',
    store_id: ''
  });

  // API fetch and product logic
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products', { method: 'GET' });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductType[] = await response.json();
      setProducts(data);

    } catch (error) {
      console.error('Error fetching products:', error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];

    if (sortConfig.key) {
        sortableProducts.sort((a, b) => {
            const aValue = a[sortConfig.key as keyof ProductType];
            const bValue = b[sortConfig.key as keyof ProductType];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'ascending'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortConfig.direction === 'ascending'
                    ? aValue - bValue
                    : bValue - aValue;
            }
            return 0;
        });
    }

    return sortableProducts.filter(product =>
      product.product_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_equivalency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, sortConfig, searchQuery]);

  // Cart logic here
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const cartEmpty = () => cart === undefined || cart.length === 0;

  const totalCost = () => {
    let total = 0;

    if (!cartEmpty()) {
      cart.forEach((product) => total += product.sell_price * product.inventory_level);
    }

    return total;
  };

  const handleQuantityChange = (productSKU: string, newQuantity: number) => {
    setCart(currentProducts => currentProducts.map(product => {
      if (product.product_sku === productSKU) {
        return { ...product, inventory_level: newQuantity };
      }
      return product;
    }));
  };

  const handleAddToCart = (product: ProductType) => {
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

  const handleRemoveFromCart = (product_sku: string) => setCart(cart.filter((product) => product.product_sku !== product_sku));

  const handleClearCart = () => {
    setCart([]);
    setConfirm(false);
  };

  const handleConfirmSell = async () => {
    try {
      const response = await fetch('/api/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          transaction_cost: totalCost(),
          transaction_tax: totalCost() * 0.1, // Example tax calculation
          transaction_prov: 'AB', // Example province
          payment_method: 'Credit Card', // Example payment method
          transaction_status: 'sold',
          cartItems: cart.map(item => ({
            product_sku: item.product_sku,
            transaction_quantity: item.inventory_level,
            transaction_cost: item.sell_price * item.inventory_level
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Transaction completed:', data);
      handleClearCart();
      fetchProducts();
    } catch (error) {
      console.error('Error completing transaction:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // addProduct logic here
  const handleOpenAdd = () => {
    setShowAddProduct(true);
  };

  const handleCloseAdd = () => {
    setShowAddProduct(false);
  };

  return (
    <div className="flex gap-2 mt-5 flex-col">
      <div className="bg-bgSoft p-5 rounded-lg mt-5 max-h-4/5 w-full">
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
              onClick={handleClearCart}
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
      <div className="bg-bgSoft p-5 rounded-lg mt-5 max-h-full w-full">
        <div className="flex items-center justify-between">
          <Search placeholder='Search for a product' setSearchQuery={setSearchQuery} />
          {!showAddProduct && ( 
            <button onClick={handleOpenAdd} className="p-2.5 bg-button text-black rounded-lg">Add New</button>
          )}
          
          <AddProduct show={showAddProduct} onClose={handleCloseAdd} newProduct={newProduct} setNewProduct={setNewProduct}/>
        </div>
        <Product 
          products={sortedProducts} 
          onAddToCart={handleAddToCart} 
          requestSort={requestSort} 
          sortConfig={sortConfig} 
        />
        <Pagination />
      </div>
    </div>
  );
}
