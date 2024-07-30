import type { EmpRefundType } from '../../types/reportTypes/types';

interface EmployeeRefundsProps {
    reportData: EmpRefundType[];
}

const EmployeeRefundsReport: React.FC<EmployeeRefundsProps> = ({ reportData }) => {
    return (
        <div>
            <h1>Employee Refunds Report</h1>
            {reportData.length === 0 ? (
                <p>No return data</p>
            ) : (
                <ul>
                    {reportData.map((refund, index) => (
                        <li key={index}>
                            <p>Employee ID: {refund.emp_id}</p>
                            <p>Total Refunds: {refund.total_refunds}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default EmployeeRefundsReport;