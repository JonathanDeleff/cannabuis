"use client";
import { MdSupervisedUserCircle, MdToday } from "react-icons/md";
import { useState, useEffect } from "react";

const MostSoldToday = () => {
    // placeholder logic for number coloring
    const [isPositive, setPositive] = useState(true);
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState({});

    // api fetch and product logic
    useEffect(() => {
        const fetchCardInfo = async () => {
            try {
                const response = await fetch('/api/dashboardviews/mostSoldToday', { method: 'GET' });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setCardData(data);
        
            } catch (error) {
                console.error('Error fetching information:', error);
        
            } finally {
                if (!noData) {
                    try {
                        const response = await fetch(`/api/products/getsku?product_sku=${cardData[0].product_sku}`);

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const data = await response.json();
                        setProductData(data);

                    } catch (error) {
                        console.error('Error fetching product data', error);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                }
                
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
        <MdToday size={24}/>
        {!noData() ? (
            <div className="flex flex-col gap-5">
                <span className="title">Most sold item today: {productData.product_title}</span>
                <span className="text-sm font-light">Total Sold: {cardData[0].total_quantity_sold}</span>
                <span className="text-sm font-light">Average Cost: ${cardData[0].average_sale_cost}</span>
            </div>
        ) : (
            <div className="flex flex-col gap-5">
                <span className="title">Most sold item today: N/a</span>
                <span className="text-sm font-light">No information found</span>
            </div>
        )}
        </div>
    );
}

export default MostSoldToday;