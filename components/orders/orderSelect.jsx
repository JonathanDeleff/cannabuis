"use client";
import { useState, useEffect } from "react";

export default function SelectedOrder({ order }) {
    
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    // API fetch and product logic
    const fetchDetails = async () => {
        try {
            const response = await fetch(`/api/orders/getdetails?order_id=${order.order_id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setItems(data);

        } catch (error) {
            console.error('Error fetching products:', error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const totalCost = () => {
        let total = 0;
    
        if (!cartEmpty()) {
            items.forEach((item) => total += item.order_cost);
        }
    
        return total;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="title">Details for Order</span>
            <span className="text-sm font-light">Order ID: {order.order_id}</span>
            <span className="text-sm font-light">Order Date: {order.order_date}</span>
            <span className="text-sm font-light">Order Status: {order.order_status}</span>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-2.5">Product SKU</td>
                        <td className="p-2.5">Quantity</td>
                        <td className="p-2.5">Cost</td>
                    </tr>
                </thead>
                <tbody>
                    {items?.map(item => (
                        <tr key={item.order_item_id}>
                            <td className="p-2.5">{item.product_sku}</td>
                            <td className="p-2.5">{item.order_quantity}</td>
                            <td className="p-2.5">${item.order_cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <span className="text-sm font-light">Total Order Cost: {totalCost()}</span>
        </div>
    )
}
