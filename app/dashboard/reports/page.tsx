"use client";
import React, { useState, useEffect } from 'react';
import {
    fetchPeakHourSales,
    fetchMostReturned,
    fetchMostSoldAllTime,
    fetchMostSoldToday,
    fetchSalesPerCategory,
    fetchEmployeeRefunds,
    fetchMostSales,
    fetchLowHourSales
} from "../../services/reportsService";
import ReportButtons from "../../components/reports/reportButtons";
import { ReportType, EmpRefundType, EmpSalesType, HourSalesType } from "../../types/reportTypes/types";
import EmployeeRefundsReport from "../../components/reports/employeeRefundsReport";
import EmployeeSalesReport from '@/app/components/reports/employeeSalesReport';
import PeakHourSalesReport from '@/app/components/reports/peakHourSalesReport';

const ReportsPage: React.FC = () => {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);
    const [reportData, setReportData] = useState<ReportType | null>(null);

    // useEffect to fetch data when selectedReport changes
    useEffect(() => {
        if (!selectedReport) return;

        // Fetch data based on selected report uses cases to determine which fetch function to call
        const fetchData = async () => {
            try {
                let data: ReportType | undefined;
                switch (selectedReport) {
                    case 'Employee Sales':
                        data = await fetchMostSales();
                        break;
                    case 'Employee Refunds':
                        data = await fetchEmployeeRefunds();
                        break;
                    case 'Peak Hour Sales':
                        data = await fetchPeakHourSales();
                        console.log("Fetched Peak Hour Sales Data:", data);
                        break;
                    case 'Low Hour Sales':
                        data = await fetchLowHourSales();
                        break;
                    case 'Sales Per Category':
                        data = await fetchSalesPerCategory();
                        break;
                    case 'Most Sold Items':
                        data = await fetchMostSoldAllTime();
                        break;
                    case 'Most Sold Items Today':
                        data = await fetchMostSoldToday();
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

    // conditional rendering depending on which report is selected
    const renderReportContent = () => {
        if (selectedReport === 'Employee Refunds' && reportData && Array.isArray(reportData) && reportData.every(item => 'total_refunds' in item)) {
            return <EmployeeRefundsReport reportData={reportData as EmpRefundType[]} />;
        }
        else if (selectedReport === 'Employee Sales' && reportData && Array.isArray(reportData) && reportData.every(item => 'total_sales' in item)) {
            return <EmployeeSalesReport salesData={reportData as EmpSalesType[]} />;
        }
        else if (selectedReport === 'Peak Hour Sales' && Array.isArray(reportData)) {
            return <PeakHourSalesReport reportData={reportData as HourSalesType[]} />;
        }
        return <p>Loading...</p>;
    };

    return (
        <main className="flex flex-col mt-5 rounded-lg">
            <ReportButtons onSelectReport={setSelectedReport} selectedReport={selectedReport} />
            <div className="mt-5 bg-gray-100 p-4 rounded-lg shadow-md">
                {selectedReport ? (
                    <div>
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