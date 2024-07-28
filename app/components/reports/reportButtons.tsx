import React from "react";

interface ReportButtonsProps {
    onSelectReport: (reportName: string) => void;
}

const ReportButtons: React.FC<ReportButtonsProps> = ({ onSelectReport }) => {
    return (
        <div className="bg-bgSoft w-full p-5 gap-2 rounded-lg">
            <p>Select a report to view:</p>
            <div className="flex gap-2">
                <button
                    onClick={() => onSelectReport('Employee Sales')}
                    className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                >
                    Employee Sales
                </button>
                <button
                    onClick={() => onSelectReport('Employee Refunds')}
                    className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                >
                    Employee Refunds
                </button>
                <button
                    onClick={() => onSelectReport('Peak Hour Sales')}
                    className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                >
                    Peak Hour Sales
                </button>
                <button
                    onClick={() => onSelectReport('Low Hour Sales')}
                    className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                >
                    Low Hour Sales
                </button>
                <button
                    onClick={() => onSelectReport('Sales Per Category')}
                    className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                >
                    Sales Per Category
                </button>
                <button
                    onClick={() => onSelectReport('Most Sold Items')}
                    className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                >
                    Most Sold Items
                </button>
                <button
                    onClick={() => onSelectReport('Most Returned Items')}
                    className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                >
                    Most Returned Items
                </button>
            </div>
        </div>
    );
};

export default ReportButtons;
