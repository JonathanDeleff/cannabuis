"use client";
import { ReportType } from "../../types/reportTypes/types";
import React, { useState } from "react";
import ReportButtons from "../../components/reports/reportButtons";

const ReportsPage: React.FC = () => {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);
    const [reportData, setReportData] = useState<ReportType | null>(null);

    const renderReportContent = () => {
        switch (selectedReport) {
            case 'Employee Sales':
                return <p>Displaying Employee Sales report...</p>;
            case 'Employee Refunds':
                return <p>Displaying Employee Refunds report...</p>;
            case 'Peak Hour Sales':
                return <p>Displaying Peak Hour Sales report...</p>;
            case 'Low Hour Sales':
                return <p>Displaying Low Hour Sales report...</p>;
            case 'Sales Per Category':
                return <p>Displaying Sales Per Category report...</p>;
            case 'Most Sold Items':
                return <p>Displaying Most Sold Items report...</p>;
            case 'Most Returned Items':
                return <p>Displaying Most Returned Items report...</p>;
            default:
                return <p>Select a report to view details.</p>;
        }
    };

    return (
        <main className="flex flex-col mt-5 rounded-lg">
            <ReportButtons onSelectReport={setSelectedReport} />
            <div className="mt-5 bg-gray-100 p-4 rounded-lg shadow-md">
                {selectedReport ? (
                    <div>
                        <p className="text-lg font-bold">Selected Report: {selectedReport}</p>
                        <div className="mt-2">
                            {renderReportContent()}
                        </div>
                    </div>
                ) : (
                    <p>Select a report to view details.</p>
                )}
            </div>
        </main>
    );
};

export default ReportsPage;
