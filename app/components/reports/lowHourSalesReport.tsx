import { HourSalesType } from "@/app/types/reportTypes/types";

interface LowHourSalesReportProps {
    reportData: HourSalesType[] | null; 
}

const LowHourSalesReport:React.FC <LowHourSalesReportProps> = ( {reportData} ) => {
    
    if (!reportData || reportData.length === 0) {
        return <p>No data available</p>;
    }
    
    const data = reportData[0];

    return (
        <div>
            <h1>Peak Hour Sales Report</h1>
            <div className="border border-border rounded-md p-4 shadow-md flex flex-col items-center">
                <span>Time: {data.hour}:00</span>
                <span>Sales Amount: ${data.total_sales}</span>
            </div>
        </div>
    );
}

export default LowHourSalesReport;