import { MdCalendarViewWeek, MdSupervisedUserCircle } from "react-icons/md";
import { useState, useEffect } from "react";

const WeeklySales = () => {
    // placeholder logic for number coloring
    const [isPositive, setPositive] = useState(true);
    const [information, setInformation] = useState({
        category_name: 'No info',
        total_sales: 'No info'
    });
    
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

                setInformation({ category_name: data.category_name, total_sales: data.total_sales });

            } catch (error) {
                console.error('Error fetching information:', error);
        
            }
        };
        fetchCardInfo();
    }, []);

    return (
        <div className="bg-bgSoft p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-hover">
        <MdCalendarViewWeek size={24}/>
        <div className="flex flex-col gap-5">
            <span className="title">Weekly sales of {information.category_name}</span>
            {/*  placeholder numbers for backend analytics*/}
            <span className="text-2xl font-medium">{information.total_sales}</span>
        </div>
        </div>
    );
}

export default WeeklySales;