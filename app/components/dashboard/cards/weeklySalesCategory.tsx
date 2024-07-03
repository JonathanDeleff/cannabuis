import { MdCalendarViewWeek } from "react-icons/md";
import { useState, useEffect } from "react";
import { CardDataType } from "@/app/types/dashboardTypes/types";

export default function WeeklySalesCategory() {
    const [cardData, setCardData] = useState<CardDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchCardInfo();
    }, []);

    const noData = cardData.length === 0;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-bgSoft p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-hover shadow-lg shadow-slate-700">
            <MdCalendarViewWeek size={24} />
            <div className="flex flex-col gap-5">
                <span className="title">Weekly sales by category</span>
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
                            <tr key={category.category}>
                                <td className="p-2">{category.category}</td>
                                <td className="p-2">${category.total_sales}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {noData && (
                    <span className="text-sm font-light">No info available</span>
                )}
            </div>
        </div>
    );
}
