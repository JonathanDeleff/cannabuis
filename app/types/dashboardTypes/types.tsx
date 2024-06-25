export interface SearchProps {
    placeholder: string;
    setSearchQuery: (query: string) => void;
}

  export interface SortConfig {
    key: string;
    direction: 'ascending' | 'descending';
}

export interface LoginStateType {
    failed: boolean;
    failText: string;
}

export interface MenuLinkItem {
    title: string;
    path: string;
    icon: JSX.Element;
}

export interface CardDataType {
    category: string;
    total_sales: number;
}

export interface DailySalesType {
    sales_date: string;
    today_sales: number;
    highest_sales_this_week: number;
    highest_sales_all_time: number;
}

export interface MostSoldTodayType {
    product_sku: string;
    total_quantity_sold: number;
    average_sale_cost: number;
}

export interface EmployeeType {
    emp_id: string;
    emp_fname: string;
    emp_lname: string;
    emp_email: string;
    emp_jobtitle: string;
    date_of_hire: string;
    password: string;
    store_id: string;
}

export interface ProductType {
    product_sku: string;
    product_brand: string;
    product_title: string;
    product_description: string;
    product_weight: string;
    product_equivalency: string;
    category: string;
    subcategory: string;
    case_size: string;
    inventory_level: number;
    cost_price: number;
    sell_price: number;
    discount_price: number;
    tags: string;
    store_id: string;
}

export interface OrderType {
    order_id: string;
    order_date: string;
    order_status: string;
    order_cost: number;
    order_items: OrderItemType[]; 
    store_id: string;
}

export interface OrderItemType {
    order_item_id: string;
    product_sku: string;
    product_title: string;
    order_quantity: number;
    order_item_cost: number;
}

export interface TransactionType {
    transaction_id: string;
    transaction_cost: number;
    transaction_tax: number;
    customer_fname: string;
    customer_lname: string;
    transaction_status: string;
    transaction_date: string;
    transaction_items: TransactionDetailsType[];
}

export interface TransactionDetailsType {
    transaction_id: string;
    transaction_item_id: string;
    product_sku: string;
    transaction_quantity: number;
}

export interface SellType {
    customer_id: string; 
    transaction_cost: number;
    transaction_tax: number;
    transaction_prov: string;
    payment_method: string;
    transaction_status: string;
    cartItems: ProductType[];
}


