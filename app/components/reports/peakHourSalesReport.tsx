import { HourSalesType } from "@/app/types/reportTypes/types";

interface PeakHourSalesReportProps {
    reportData: HourSalesType[] | null; 
}

const PeakHourSalesReport: React.FC<PeakHourSalesReportProps> = ({ reportData }) => {
    if (!reportData || reportData.length === 0) {
        return <p>No data available</p>;
    }

    // Extract the first item from the array
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

export default PeakHourSalesReport;
