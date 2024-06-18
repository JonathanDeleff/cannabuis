import { MdSupervisedUserCircle } from "react-icons/md";
import { useState, useEffect } from "react";

const MostSoldToday = () => {
    // placeholder logic for number coloring
    const [isPositive, setPositive] = useState(true);
    const [information, setInformation] = useState([]);

    // api fetch and product logic
    useEffect(() => {
        const fetchCardInfo = async () => {
            try {
                const response = await fetch('/api/Views/dashboardviews', { method: 'GETMOSTSOLDITEMTODAY' });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setInformation(await data);
        
            } catch (error) {
                console.error('Error fetching information:', error);
        
            }
        } 
        fetchCardInfo();
    }, []);
    
    return (
        <div className="bg-bgSoft p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-hover">
        <MdSupervisedUserCircle size={24}/>
        <div className="flex flex-col gap-5">
            <span className="title">Most sold today</span>
            {/*  placeholder numbers for backend analytics*/}
            <table className="w-full">
                <tbody>
                    {information.map(product => (
                        <tr key={product.product_sku}>
                            <td className="p-2">
                                <span className="text-sm font-light">{product.product_sku}: {product.total_sold} sold</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default MostSoldToday;