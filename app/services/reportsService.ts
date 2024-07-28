import { MostSoldTodayType } from "../types/dashboardTypes/types";
import { EmpRefundType, EmpSalesType, LowHourSalesType, MostReturnedType, MostSoldAllTimeType, PeakHourSalesType, SalesPerCategoryType } from "../types/reportTypes/types";

export const fetchLeastSales = async (): Promise<EmpSalesType | undefined> => {
    try {
        const response = await fetch('/api/reports/employeeReports/employeeLeastSales');
        if (!response.ok) {
            throw new Error('Failed to fetch employee sales data');
        }
        return response.json();
    } catch (error) {
        console.log('Failed to fetch employee sales data:', error);
    }

}

export const fetchMostSales = async (): Promise<EmpSalesType | undefined> => {
    try {
        const response = await fetch('/api/reports/employeeReports/employeeMostSales');
        if (!response.ok) {
            throw new Error('Failed to fetch employee sales data');
        }
        return response.json();
    } catch (error) {
        console.log('Failed to fetch employee sales data:', error);
    }
}

export const fetchEmployeeRefunds = async (): Promise<EmpRefundType | undefined> => {
    try {
        const response = await fetch('/api/reports/employeeRefunds');
        if (!response.ok) {
            throw new Error('Failed to fetch employee sales data');
        }
        return response.json();
    } catch (error) {
        console.log('Failed to fetch employee sales data:', error);
    }
}

export const fetchLowHourSales = async (): Promise<LowHourSalesType | undefined> => {
    try {
        const response = await fetch('/api/reports/lowHourSales');
        if (!response.ok) {
            throw new Error('Failed to fetch employee sales data');
        }
        return response.json();
    } catch (error) {
        console.log('Failed to fetch employee sales data:', error);
    }
}

export const fetchPeakHourSales = async (): Promise<PeakHourSalesType | undefined> => {
    try {
        const response = await fetch('/api/reports/peakHourSales');
        if (!response.ok) {
            throw new Error('Failed to fetch employee sales data');
        }
        return response.json();
    } catch (error) {
        console.log('Failed to fetch employee sales data:', error);
    }
}

export const fetchMostReturned = async (): Promise<MostReturnedType | undefined> => {
    try {
        const response = await fetch('/api/reports/mostReturned');
        if (!response.ok) {
            throw new Error('Failed to fetch employee sales data');
        }
        return response.json();
    } catch (error) {
        console.log('Failed to fetch employee sales data:', error);
    }
}

export const fetchMostSoldAllTime = async (): Promise<MostSoldAllTimeType | undefined> => {
    try {
        const response = await fetch('/api/reports/mostSold/mostSoldAllTime');
        if (!response.ok) {
            throw new Error('Failed to fetch employee sales data');
        }
        return response.json();
    } catch (error) {
        console.log('Failed to fetch employee sales data:', error);
    }
}

export const fetchMostSoldToday = async (): Promise<MostSoldTodayType | undefined> => {
    try {
        const response = await fetch('/api/reports/mostSold/mostSoldToday');
        if (!response.ok) {
            throw new Error('Failed to fetch employee sales data');
        }
        return response.json();
    } catch (error) {
        console.log('Failed to fetch employee sales data:', error);
    }
}

export const fetchSalesPerCategory = async (): Promise<SalesPerCategoryType | undefined> => {
    try {
        const response = await fetch('/api/reports/salesPerCategory');
        if (!response.ok) {
            throw new Error('Failed to fetch employee sales data');
        }
        return response.json();
    } catch (error) {
        console.log('Failed to fetch employee sales data:', error);
    }
}