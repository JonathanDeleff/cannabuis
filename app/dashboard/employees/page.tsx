"use client";
import { Search } from "@/app/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/app/components/dashboard/pagination";
import Employee from "@/app/components/employees/employeeRender";
import { useState, useEffect } from "react";
import { EmployeeType } from "@/app/types/dashboardTypes/types";

export default function EmployeesPage() {
  
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingEmployee, setEditingEmployee] = useState<EmployeeType | null>(null);
  

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

        const data: EmployeeType[] = await response.json();
        
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
        <Search placeholder='Search for an employee' setSearchQuery={setSearchQuery}/>
        <Link href={"/dashboard/employees/add"}>
          <button className="p-2.5 bg-button text-black rounded-lg">Add New</button>
        </Link>
      </div>
        <Employee employees={employees} editingEmployee={editingEmployee} setEditingEmployee={setEditingEmployee} setEmployees={setEmployees}/>
      <Pagination />
    </div>
  );
}


