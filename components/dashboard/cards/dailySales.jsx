import { MdSell, MdSupervisedUserCircle } from "react-icons/md";
import { useState, useEffect } from "react";

const DailySales = () => {
    // placeholder logic for number coloring
    const [isPositive, setPositive] = useState(true);
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className="bg-bgSoft p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-hover">
        <MdSell size={24}/>
        {!noData() ? (
            <div className="flex flex-col gap-5">
                <span className="title">Sales for {cardData[0].sales_date}</span>
                <span className="text-sm font-light">Sales today: {cardData[0].today_sales}</span>
                <span className="text-sm font-light">Sales this week: {cardData[0].highest_sales_this_week}</span>
                <span className="text-sm font-light">Sales all time: {cardData[0].highest_sales_all_time}</span>
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

export default DailySales;