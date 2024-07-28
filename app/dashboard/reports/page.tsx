"use client";

import { useState } from "react";

const ReportsPage = () => {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);

    const handleReportSelection = (reportName: string) => {
        setSelectedReport(reportName);
    };

    return (
        <main className="flex mt-5 rounded-lg">
            <div className="bg-bgSoft w-full p-5 gap-2 rounded-lg">
                <p>Select a report to view:</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleReportSelection('Employee Sales')}
                        className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                    >
                        Employee Sales
                    </button>
                    <button
                        onClick={() => handleReportSelection('Employee Refunds')}
                        className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                    >
                        Employee Refunds
                    </button>
                    <button
                        onClick={() => handleReportSelection('Peak Hour Sales')}
                        className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                    >
                        Peak Hour Sales
                    </button>
                    <button
                        onClick={() => handleReportSelection('Low Hour Sales')}
                        className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                    >
                        Low Hour Sales
                    </button>
                    <button
                        onClick={() => handleReportSelection('Sales Per Category')}
                        className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                    >
                        Sales Per Category
                    </button>
                    <button
                        onClick={() => handleReportSelection('Most Sold Items')}
                        className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                    >
                        Most Sold Items
                    </button>
                    <button
                        onClick={() => handleReportSelection('Most Returned Items')}
                        className="text-white bg-button rounded-lg p-1.5 shadow-md shadow-slate-600"
                    >
                        Most Returned Items
                    </button>
                </div>
                {selectedReport && (
                    <div className="mt-5">
                        <p>Selected Report: {selectedReport}</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default ReportsPage;
