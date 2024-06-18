"use client";
import { useState, useEffect } from "react";
import Orders from "@/components/orders/orderRender";
import Search from "@/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/components/dashboard/pagination";

const OrdersPage = () => {

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders', {
                    method: 'GET',
                });
                setLoading(false);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const processedData = data.map(order => {
                    return {
                      ...order,
                      order_date: order.order_date.split('T')[0],
                    };
                  });

                setOrders(processedData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder='Search for a Transaction' />
        <Link href={"/components/products/addProduct"}>
          <button className="p-2.5 bg-button text-black rounded-lg">Add New</button>
        </Link>
      </div>
        <Orders orders={orders} />
      <Pagination />
    </div>
    )
}

export default OrdersPage