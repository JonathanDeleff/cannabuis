"use client";
import Search from "@/components/dashboard/search";
import Pagination from "@/components/dashboard/pagination";
import { useState, useEffect, useMemo } from "react";
import Product from "@/components/products/productRender";
import Cart from "@/components/products/shoppingCart";
import Confirm from "@/components/order/confirmOrder";
import AddProduct from "@/components/products/addProduct";

export default function OrderPage() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [confirm, setConfirm] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({
        product_sku: '',
        product_brand: '',
        product_title: '',
        product_description: '',
        product_weight: '',
        product_equivalency: '',
        category: '',
        subcategory: '',
        case_size: '',
        inventory_level: '',
        cost_price: '',
        sell_price: '',
        discount_price: '',
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

            const data = await response.json();
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
            product.product_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, sortConfig, searchQuery]);

    // Cart logic here
    const requestSort = key => {
        let direction = 'ascending';
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
    };

    const handleConfirmOrder = async () => {
        // API FOR ORDER HERE
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
                            onConfirm={handleConfirmOrder}
                            onCancel={() => setConfirm(false)}
                        />
                    ) : (
                        <button 
                            className="mt-1 p-2.5 bg-button text-black rounded-lg" 
                            onClick={() => setConfirm(true)}
                        >
                            Order Items
                        </button>
                    )}
                </div>
            )}
        </div>
        <div className="bg-bgSoft p-5 rounded-lg mt-5 max-h-full w-full">
            <div className="flex items-center justify-between">
                <Search placeholder='Search for a product' setSearchQuery={setSearchQuery} />
                <button onClick={handleOpenAdd} className="p-2.5 bg-button text-black rounded-lg">Add New</button>
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