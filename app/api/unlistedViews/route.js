/**
 * API Endpoints for retrieving data from various views in the database
 * 
 * Functions:
 * 
 * - getMostSoldItems(req):
 *     Fetches data from the 'Most_Sold_Items' view.
 *     Returns the most sold items with their total quantities sold.
 * 
 * - getEmployeeRefunds(req):
 *     Fetches data from the 'Employee_Refunds' view.
 *     Returns the number of refunds processed by each employee.
 * 
 * - getMostReturnedItems(req):
 *     Fetches data from the 'Most_Returned_Items' view.
 *     Returns the most returned items with their total quantities returned.
 * 
 * - getOverallLossSales(req):
 *     Fetches data from the 'Overall_Loss_Sales' view.
 *     Returns the total financial loss due to refunds.
 * 
 * - getEmployeeMostItemsSold(req):
 *     Fetches data from the 'Employee_Most_Items_Sold' view.
 *     Returns the total quantity of items sold by each employee.
 * 
 * - getEmployeeMostSales(req):
 *     Fetches data from the 'Employee_Most_Sales' view.
 *     Returns the total sales value achieved by each employee.
 * 
 * - getEmployeeLeastSales(req):
 *     Fetches data from the 'Employee_Least_Sales' view.
 *     Returns the total sales value achieved by each employee, ordered from least to most.
 * 
 * - getPeakHourSales(req):
 *     Fetches data from the 'Peak_Hour_Sales' view.
 *     Returns the hour of the day with the highest total sales.
 * 
 * - getLowHourSales(req):
 *     Fetches data from the 'Low_Hour_Sales' view.
 *     Returns the hour of the day with the lowest total sales.
 * 
 * - getSalesPerCategory(req):
 *     Fetches data from the 'Sales_Per_Category' view.
 *     Returns the total sales value for each product category.
 */



import sql from '@/app/lib/db';

export async function GET(req) {
    try {
        const data = await sql`SELECT * FROM Most_Sold_Items;`;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GETEMPLOYEEREFUNDS(req) {
    try {
        const data = await sql`SELECT * FROM Employee_Refunds;`;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GETMOSTRETURNEDITEMS(req) {
    try {
        const data = await sql`SELECT * FROM Most_Returned_Items;`;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GETOVERALLLOSSSALES(req) {
    try {
        const data = await sql`SELECT * FROM Overall_Loss_Sales;`;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GETEMPLOYEEMOSTITEMSSOLD(req) {
    try {
        const data = await sql`SELECT * FROM Employee_Most_Items_Sold;`;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GETEMPLOYEEMOSTSALES(req) {
    try {
        const data = await sql`SELECT * FROM Employee_Most_Sales;`;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GETEMPLOYEELEASTSALES(req) {
    try {
        const data = await sql`SELECT * FROM Employee_Least_Sales;`;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GETPEAKHOURSALES(req) {
    try {
        const data = await sql`SELECT * FROM Peak_Hour_Sales;`;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GETLOWHOURSALES(req) {
    try {
        const data = await sql`SELECT * FROM Low_Hour_Sales;`;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GETSALESPERCATEGORY(req) {
    try {
        const data = await sql`SELECT * FROM Sales_Per_Category;`;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
