// components/reports/ReportButtons.tsx
import React from 'react';

type ReportButtonsProps = {
    onSelectReport: (report: string) => void;
    selectedReport: string | null;
};

const ReportButtons: React.FC<ReportButtonsProps> = ({ onSelectReport, selectedReport }) => {
    const buttons = [
        'Employee Sales', 'Employee Refunds', 'Peak Hour Sales', 
        'Low Hour Sales', 'Sales Per Category', 'Most Sold Items', 'Most Returned Items'
    ];

    return (
        <div className="flex gap-2 bg-bgSoft p-2 rounded-lg">
            {buttons.map((report) => (
                <button
                    key={report}
                    className={`text-white p-1.5 rounded-lg shadow-md transition transform
                        ${selectedReport === report ? 'shadow-inner scale-95' : 'hover:scale-105'}
                        ${selectedReport === report ? 'bg-buttonDark' : 'bg-button hover:bg-buttonDark'}`}
                    onClick={() => onSelectReport(report)}
                >
                    {report}
                </button>
            ))}
        </div>
    );
};

export default ReportButtons;
