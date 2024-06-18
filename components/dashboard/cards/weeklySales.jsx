import { MdCalendarViewWeek, MdSupervisedUserCircle } from "react-icons/md";
import { useState, useEffect } from "react";

const WeeklySales = () => {
    // placeholder logic for number coloring
    const [isPositive, setPositive] = useState(true);
    const [cardData, setCardData] = useState([]);
    
    const randomElementFromArray = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    }

    // api fetch and product logic
    useEffect(() => {
        const fetchCardInfo = async () => {
            try {
                const response = await fetch('/api/Views/dashboardviews', { method: 'GETWEEKLYSALESBYCATEGORY' });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = randomElementFromArray(await response.json());
                setCardData(data);

            } catch (error) {
                console.error('Error fetching information:', error);
        
            }
        };
        fetchCardInfo();
    }, []);

    return (
        <div className="bg-bgSoft p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-hover">
        <MdCalendarViewWeek size={24}/>
        {cardData.length > 0 ? (
            <div className="flex flex-col gap-5">
                <span className="title">Weekly sales of {cardData[0].category_name}</span>
                <span className="text-2xl font-medium">{cardData[0].total_sales}</span>
            </div>
        ) : (
            <div className="flex flex-col gap-5">
                <span className="title">Weekly sales of random category</span>
                <span className="text-2xl font-medium">No info available</span>
            </div>
        )}
        </div>
    );
}

export default WeeklySales;