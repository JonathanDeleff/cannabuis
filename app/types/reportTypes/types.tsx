export interface EmpRefundType {
    emp_id: string;
    total_refunds: number;
}

export interface EmpSalesType {
    emp_id: string;
    total_sales: number;
}

export interface EmployeeSalesReportType {
    mostSales: EmpSalesType | null;
    leastSales: EmpSalesType | null;
}

export interface LowHourSalesType {
    hour: number;
    total_sales: number;
}

export interface PeakHourSalesType {
    hour: number;
    total_sales: number;
}

export interface SalesPerCategoryType {
    category_name: string;
    total_sales: number;
}

export interface MostReturnedType {
    product_sku: string;
    total_returned: number;
}

export interface MostSoldAllTimeType {
    product_sku: string;
    total_sold: number;
}

export interface MostSoldTodayType {
    product_sku: string;
    total_quantity_sold: number;
    average_sale_cost: number;
}

export type ReportType = 
    | EmpRefundType
    | EmpSalesType
    | LowHourSalesType
    | PeakHourSalesType
    | SalesPerCategoryType
    | MostReturnedType
    | MostSoldAllTimeType
    | MostSoldTodayType;