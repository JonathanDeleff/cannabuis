"use client";
import { useState, useEffect } from "react";
import Orders from "@/app/components/orders/orderRender";
import { Search } from "@/app/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/app/components/dashboard/pagination";
import SelectedOrder from "@/app/components/orders/orderSelect";
import { OrderType } from "@/app/types/dashboardTypes/types";

export default function OrdersPage() {

    const [loading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [selected, setSelected] = useState<OrderType | null>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

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

                const data: OrderType[] = await response.json();
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

    const handleSelectOrder = (order: OrderType) => {
      setSelected(order);
      setIsSelected(true);
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {selected && (
          <div className="bg-bgSoft p-5 rounded-lg mt-5">
            <SelectedOrder order={selected} />
          </div>
        )}
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
          <div className="flex items-center justify-between">
            <Search placeholder='Search for a Transaction' setSearchQuery={setSearchQuery}/>
            <Link href={"/components/products/addProduct"}>
              <button className="p-2.5 bg-button text-black rounded-lg">Add New</button>
            </Link>
          </div>
            <Orders orders={orders} onSelect={handleSelectOrder} />
          <Pagination />
        </div>
      </div>
    )
}
