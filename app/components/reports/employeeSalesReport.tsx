import { fetchEmployees } from "@/app/services/reportsService";
import { EmployeeType } from "@/app/types/dashboardTypes/types";
import { EmpSalesType } from "@/app/types/reportTypes/types";
import { useEffect, useState } from "react";

interface EmployeeSalesProps {
    salesData: EmpSalesType[];
}

const EmployeeSalesReport: React.FC<EmployeeSalesProps> = ({ salesData }) => {
    
    const [employees, setEmployees] = useState<EmployeeType[] | null>(null);

    // useEffect to fetch employees to extract names
    useEffect(() => {
        const getEmployees = async () => {
            try {
                const data = await fetchEmployees();
                if (Array.isArray(data)) {
                    setEmployees(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        getEmployees();
    }, []);

    // condition if data for some reason doesn't come through
    if (salesData.length === 0) {
        return <p>No sales data available</p>;
    }

    // calculate total sales, highest selling employee, lowest selling employee, and average sales
    const totalSales = salesData.reduce((sum, employee) => {
        const sales = Number(employee.total_sales);
        return sum + (isNaN(sales) ? 0 : sales);
      }, 0);

    const highestSellingEmployee = salesData.reduce((prev, current) => (prev.total_sales > current.total_sales) ? prev : current);
    const lowestSellingEmployee = salesData.reduce((prev, current) => (prev.total_sales < current.total_sales) ? prev : current);
    const averageSales = salesData.length > 0 ? totalSales / salesData.length : 0;

    // function to get name of employee from id in the data
    const getEmployeeName = (emp_id: string) => {
        const employee = employees?.find(emp => emp.emp_id === emp_id);
        return employee ? `${employee.emp_fname} ${employee.emp_lname}` : 'Unknown Employee';
    };
    
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-border rounded-md border-2 shadow-md shadow-slate-500 p-4 flex flex-col items-center">
                    <span>Highest Selling Employee:</span>
                    <span>{getEmployeeName(highestSellingEmployee.emp_id)}</span>
                    <span>${highestSellingEmployee.total_sales} sales</span>
                </div>
                <div className="border-border rounded-md border-2 shadow-md shadow-slate-500 p-4 flex flex-col items-center">
                    <span>Lowest Selling Employee:</span>
                    <span>{getEmployeeName(lowestSellingEmployee.emp_id)} with ${lowestSellingEmployee.total_sales} sales</span>
                </div>
                <div className="border-border rounded-md border-2 shadow-md shadow-slate-500 p-4 flex flex-col items-center">
                    <span>Average Sales Amount:</span>
                    <span>${averageSales.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}

export default EmployeeSalesReport;