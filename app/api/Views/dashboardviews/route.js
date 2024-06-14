import postgres from "postgres";

const sql = postgres({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: 'require',    
});

/**
 * Fetches data from the 'daily_vs_weekly_vs_alltime_sales' view.
 * Returns the total sales for the current day, the highest sales in a single day during the current week, 
 * and the highest sales in a single day of all time.
 */
export async function GETDAILYVSWEEKLYVSALLTIMESALES(req) {
    try {
        const data = await sql`SELECT * FROM daily_vs_weekly_vs_alltime_sales;`;
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

/**
 * Fetches data from the 'most_sold_item_today' view.
 * Returns the most sold item of the current day and the average sale cost for that item.
 */
export async function GETMOSTSOLDITEMTODAY(req) {
    try {
        const data = await sql`SELECT * FROM most_sold_item_today;`;
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

/**
 * Fetches data from the 'weekly_sales_by_category' view.
 * Returns the total sales for each product category for the current week.
 */
export async function GETWEEKLYSALESBYCATEGORY(req) {
    try {
        const data = await sql`SELECT * FROM weekly_sales_by_category;`;
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
