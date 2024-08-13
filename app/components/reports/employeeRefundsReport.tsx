import type { EmpRefundType } from '../../types/reportTypes/types';
import { EmployeeType } from '../../types/dashboardTypes/types';
import { useEffect, useState } from 'react';
import { fetchEmployees } from '../../services/reportsService';

interface EmployeeRefundsProps {
    reportData: EmpRefundType[];
}

const EmployeeRefundsReport: React.FC<EmployeeRefundsProps> = ({ reportData }) => {
 
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

    // function to get name of employee from id in the data
    const getEmployeeName = (emp_id: string) => {
        const employee = employees?.find(emp => emp.emp_id === emp_id);
        return employee ? `${employee.emp_fname} ${employee.emp_lname}` : 'Unknown Employee';
    };
 
    return (
        <div>
        <h1>Employee Refunds Report</h1>
        {reportData.length === 0 ? (
            <p>No return data</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reportData.map((refund, index) => (
                    <div 
                        key={index} 
                        className="border-border rounded-md border-2 shadow-md shadow-slate-500 p-4 flex flex-col items-center"
                    >
                        <span>Employee Name:</span>
                        <span>{getEmployeeName(refund.emp_id)}</span>
                        <span>Total Refunds:</span>
                        <span>${refund.total_refunds}</span>
                    </div>
                ))}
            </div>
        )}
    </div>
    );
}

export default EmployeeRefundsReport;