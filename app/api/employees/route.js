// app/api/employees/route.js
import { Pool } from 'pg';

// Create a database connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: 'require', // Assuming you require SSL
});

// Function to fetch employees from the database
const getEmployees = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM c_employee');
    return result.rows;
  } catch (error) {
    console.error('Error in getEmployees', error);
    throw error;
  } finally {
    client.release();
  }
};

// Route handler for fetching employees
export async function GET(req, res) {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Failed to fetch employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
}
