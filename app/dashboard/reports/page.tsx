// pages/reports/ReportsPage.tsx
"use client";
import React, { useState, useEffect } from "react";
import {
    fetchLeastSales,
    fetchMostSales,
    fetchEmployeeRefunds,
    fetchLowHourSales,
    fetchPeakHourSales,
    fetchMostReturned,
    fetchMostSoldAllTime,
    fetchMostSoldToday,
    fetchSalesPerCategory
} from "../../services/reportsService";
import ReportButtons from "../../components/reports/reportButtons";
import {
    ReportType,
} from "../../types/reportTypes/types";

const ReportsPage: React.FC = () => {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);
    const [reportData, setReportData] = useState<ReportType | null>(null); // Include null in the type

    useEffect(() => {
        if (!selectedReport) return;

        const fetchData = async () => {
            try {
                let data: ReportType | undefined;
                switch (selectedReport) {
                    case 'Employee Sales':
                        data = await fetchMostSales(); // Replace with the relevant fetch function
                        break;
                    case 'Employee Refunds':
                        data = await fetchEmployeeRefunds();
                        break;
                    case 'Peak Hour Sales':
                        data = await fetchPeakHourSales();
                        break;
                    case 'Low Hour Sales':
                        data = await fetchLowHourSales();
                        break;
                    case 'Sales Per Category':
                        data = await fetchSalesPerCategory();
                        break;
                    case 'Most Sold Items':
                        data = await fetchMostSoldAllTime(); // Replace with the relevant fetch function
                        break;
                    case 'Most Returned Items':
                        data = await fetchMostReturned();
                        break;
                    default:
                        data = undefined;
                        break;
                }
                setReportData(data || null); // Allow null to indicate no data
            } catch (error) {
                console.error("Error fetching report data:", error);
                setReportData(null); // Set to null on error
            }
        };

        fetchData();
    }, [selectedReport]);

    const renderReportContent = () => {
        return <p>Data fetched, ready to render...</p>;
    };

    return (
        <main className="flex flex-col mt-5 rounded-lg">
            <ReportButtons onSelectReport={setSelectedReport} selectedReport={selectedReport} />
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
