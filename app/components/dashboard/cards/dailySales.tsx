"use client";
import { MdSell, MdSupervisedUserCircle } from "react-icons/md";
import { useState, useEffect } from "react";
import { DailySalesType } from "@/app/types/dashboardTypes/types";

export default function DailySales() {
    // placeholder logic for number coloring
    const [isPositive, setPositive] = useState<boolean>(true);
    const [cardData, setCardData] = useState<DailySalesType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // api fetch and product logic
    useEffect(() => {
        const fetchCardInfo = async () => {
            try {
                const response = await fetch('/api/dashboardviews/dailySales', { method: 'GET' });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setCardData(await data);
        
            } catch (error) {
                console.error('Error fetching information:', error);

            } finally {
                setLoading(false);
                
            }
        };
        fetchCardInfo();
    }, []);

    const noData = () => cardData === undefined || cardData.length == 0;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-bgSoft p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-hover shadow-md shadow-slate-700">
        <MdSell size={24}/>
        {!noData() ? (
            <div className="flex flex-col gap-5">
                <span className="title">Sales for {new Date(cardData[0].sales_date).toDateString()}</span>
                <span className="text-sm font-light">Sales today: ${cardData[0].today_sales}</span>
                <span className="text-sm font-light">Sales this week: ${cardData[0].highest_sales_this_week}</span>
                <span className="text-sm font-light">Sales all time: ${cardData[0].highest_sales_all_time}</span>
            </div>
        ) : (
            <div className="flex flex-col gap-5">
                <span className="title">Sales for today</span>
                <span className="text-sm font-light">Information not found</span>
            </div>
        )}
        </div>
    );
}
