"use client";
import { MdCalendarViewWeek, MdSupervisedUserCircle } from "react-icons/md";
import { useState, useEffect } from "react";

const WeeklySalesCategory = () => {
    // placeholder logic for number coloring
    const [isPositive, setPositive] = useState(true);
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const randomElementFromArray = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    }

    // api fetch and product logic
    useEffect(() => {
        const fetchCardInfo = async () => {
            try {
                const response = await fetch('/api/dashboardviews/weeklySalesCategory', { method: 'GET' });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setCardData(data);

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
        <div className="bg-bgSoft p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-hover">
        <MdCalendarViewWeek size={24}/>
        <div className="flex flex-col gap-5">
            <span className="title"> Weekly sales by category</span>
            <table className="w-full">
                    <thead>
                    <tr>
                        <th className="p-2 cursor-pointer">
                            <div className="flex flex-row items-center"> 
                                Category
                            </div>
                        </th>
                        <th className="p-2 cursor-pointer items-center w-14">
                            <div className="flex flex-row">
                                Sales
                            </div>
                        </th>
                    </tr>
                    </thead>
                <tbody>
                {cardData.map(category => (
                    <tr key={category.category_name}>
                    <td className="p-2">
                        {category.category_name}
                    </td>
                    <td className="p-2">
                        {category.total_sales}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {noData() && (
                <span className="text-sm font-light">No info available</span>
            )}
        </div>
        </div>
    );
}

export default WeeklySalesCategory;