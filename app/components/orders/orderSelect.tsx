import { OrderType, OrderItemType } from "@/app/types/dashboardTypes/types";
import { useState, useEffect } from "react";

interface SelectedOrderProps {
    order: OrderType; 
}

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const getStatusClass = (status: string) => {
    switch (status) {
        case 'delivered':
            return 'bg-complete';
        case 'on route':
            return 'bg-pending';
        case 'Cancelled':
            return 'bg-cancelled';
        default:
            return 'bg-gray-500'; // Default styling if status is not recognized
    }
};

const SelectedOrder: React.FC<SelectedOrderProps> = ({ order }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<OrderItemType[]>([]);

    useEffect(() => {
        // You can optionally fetch more details of the selected order here
        // For demonstration, we assume order items are already available in `order.order_items`
        setItems(order.order_items);
        setLoading(false);
    }, [order]);

    const totalCost = () => {
        let total = 0;
        items.forEach((item) => total += item.order_item_cost);
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
            <span className="text-sm font-light">Order Status: {capitalizeFirstLetter(order.order_status)}</span>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-2.5">Product SKU</td>
                        <td className="p-2.5">Product Name</td>
                        <td className="p-2.5">Quantity</td>
                        <td className="p-2.5">Cost</td>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.order_item_id}>
                            <td className="p-2.5">{item.product_sku}</td>
                            <td className="p-2.5">{item.product_title}</td>
                            <td className="p-2.5">{item.order_quantity}</td>
                            <td className="p-2.5">${item.order_item_cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <span className="text-sm font-light">Total Order Cost: ${order.order_cost}</span>
        </div>
    );
};

export default SelectedOrder;
