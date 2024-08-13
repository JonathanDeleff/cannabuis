export interface EmpRefundType {
    emp_id: string;
    total_refunds: number;
}

export interface EmpSalesType {
    emp_id: string;
    first_name: string;
    last_name: string;
    store_id: string;
    store_name: string;
    total_sales: number;
}

export interface HourSalesType {
    hour: number;
    total_sales: number;
}

export interface SalesPerCategoryType {
    category_name: string;
    total_sales: number;
}

export interface MostReturnedType {
    product_sku: string;
    product_title: string;
    total_returned: number;
}

export interface MostSoldAllTimeType {
    product_sku: string;
    product_title: string;
    total_sold: number;
}

export interface MostSoldTodayType {
    product_sku: string;
    product_title: string;
    total_quantity_sold: number;
    average_sale_cost: number;
}

export type ReportType = 
    | EmpRefundType
    | EmpSalesType
    | HourSalesType
    | SalesPerCategoryType
    | MostReturnedType
    | MostSoldTodayType
    | MostSoldAllTimeType;