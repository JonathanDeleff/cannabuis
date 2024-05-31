// app/dashboard/employees/page.jsx
"use client";
import Search from "@/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/components/dashboard/pagination";
import Employee from "@/components/employees/employeeRender";
import { useState, useEffect } from "react";

export default function EmployeesPage() {
  
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees', {
          method: 'GET',
        });
        setLoading(false);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        const processedData = data.map(employee => {
          return {
            ...employee,
            date_of_hire: employee.date_of_hire.split('T')[0],
          };
        });

        setEmployees(processedData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);
      
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-bgSoft p-5 rounded-lg mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder='Search for an employee' />
        <Link href={"/dashboard/employees/add"}>
          <button className="p-2.5 bg-button text-black rounded-lg">Add New</button>
        </Link>
      </div>
        <Employee employees={employees} />
      <Pagination />
    </div>
  );
}


