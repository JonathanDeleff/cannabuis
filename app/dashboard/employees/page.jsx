// app/dashboard/employees/page.jsx
import Search from "@/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/components/dashboard/pagination";
import Employee from "@/components/employees/employeeRender";
import postgres from "postgres";

// connect to the database
const sql = postgres({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: 'require',    
});


export default async function EmployeesPage() {
  
    // get employees from database
   const getEmployees = async () => {
    const rows = await sql`SELECT * FROM c_employee`;
    return rows;
    };

    const employees = await getEmployees();

    // need to convert response dates to strings to display them properly
    const formattedEmployees = employees.map(employee => {
        const formattedEmployee = { ...employee };

        // format the dates to remove unnecessary time information 
        formattedEmployee.date_of_hire = formattedEmployee.date_of_hire.toISOString().split('T')[0];       
        formattedEmployee.created_at = formattedEmployee.created_at.toISOString().split('T')[0];      
        formattedEmployee.updated_at = formattedEmployee.updated_at.toISOString().split('T')[0];
        return formattedEmployee;
      });
      
    

  return (
    <div className="bg-bgSoft p-5 rounded-lg mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder='Search for an employee' />
        <Link href={"/dashboard/employees/add"}>
          <button className="p-2.5 bg-button text-black rounded-lg">Add New</button>
        </Link>
      </div>
        <Employee employees={formattedEmployees} />
      <Pagination />
    </div>
  );
}


