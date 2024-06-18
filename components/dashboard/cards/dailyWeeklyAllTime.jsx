import { MdSell, MdSupervisedUserCircle } from "react-icons/md";
import { useState, useEffect } from "react";

const DailyWeeklyAllTime = () => {
    // placeholder logic for number coloring
    const [isPositive, setPositive] = useState(true);
    const [cardData, setCardData] = useState([]);

    // api fetch and product logic
    useEffect(() => {
        const fetchCardInfo = async () => {
            try {
                const response = await fetch('/api/Views/dashboardviews', { method: 'GETDAILYVSWEEKLYVSALLTIMESALES' });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setCardData(await data);
        
            } catch (error) {
                console.error('Error fetching information:', error);
        
            }
        };
        fetchCardInfo();
    }, []);

    return (
        <div className="bg-bgSoft p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-hover">
        <MdSell size={24}/>
        {cardData.length > 0 ? (
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

export default DailyWeeklyAllTime;