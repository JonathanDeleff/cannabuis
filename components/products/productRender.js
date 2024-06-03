import React, { useState, useMemo } from 'react';

const Product = ({ products, onAddToCart, searchQuery }) => {
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

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
        if (
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2.5 cursor-pointer" onClick={() => requestSort('product_sku')}>SKU</th>
                        <th className="p-2.5 cursor-pointer" onClick={() => requestSort('product_title')}>Product Name</th>
                        <th className="p-2.5 cursor-pointer" onClick={() => requestSort('product_brand')}>Brand</th>
                        <th className="p-2.5 cursor-pointer" onClick={() => requestSort('product_equivalency')}>Category</th>
                        <th className="p-2.5 cursor-pointer" onClick={() => requestSort('inventory_level')}>Stock</th>
                        <th className="p-2.5 cursor-pointer" onClick={() => requestSort('sell_price')}>Price</th>
                        <th className="p-2.5">Description</th>
                        <th className="p-2.5">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map(product => (
                        <tr key={product.product_sku}>
                            <td className="p-2.5">{product.product_sku}</td>
                            <td className="p-2.5">{product.product_title}</td>
                            <td className="p-2.5">{product.product_brand}</td>
                            <td className="p-2.5">{product.product_equivalency}</td>
                            <td className="p-2.5">{product.inventory_level}</td>
                            <td className="p-2.5">${product.sell_price}</td>
                            <td className="p-2.5">{product.product_description}</td>
                            <td className="p-2.5">
                                <button 
                                    className="bg-blue-500 text-white p-2 rounded" 
                                    onClick={() => onAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Product;
