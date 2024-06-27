import type { EmployeeType } from '@/app/types/dashboardTypes/types';
import EditEmployee from '@/app/components/employees/EditEmployee';

interface EmployeeProps {
    employees: EmployeeType[];
    setEditingEmployee: React.Dispatch<React.SetStateAction<EmployeeType | null>>;
    editingEmployee: EmployeeType | null;
    setEmployees: React.Dispatch<React.SetStateAction<EmployeeType[]>>;
}

const Employee: React.FC<EmployeeProps> = ( {employees, setEditingEmployee, editingEmployee, setEmployees} ) => {    

    const handleEdit = (employee: EmployeeType) => {
        setEditingEmployee(employee);
    }

    const handleCancel = () => {
        setEditingEmployee(null);
    }

    const updateEmployee = (updatedEmployee: EmployeeType) => {
        const updatedEmployees = employees.map(emp => {
            if (emp.emp_id === updatedEmployee.emp_id) {
                return updatedEmployee;
            }
            return emp;
        });
        setEmployees(updatedEmployees);
        setEditingEmployee(null);
    };

    
    

    return (
        <div>
            {editingEmployee? (<EditEmployee employee={editingEmployee} cancelEdit={handleCancel} updateEmployee={updateEmployee}/>) : ( 
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-2.5">Name</td>
                        <td className="p-2.5">Email</td>
                        <td className="p-2.5">Date of Hire</td>
                        <td className="p-2.5">Role</td>
                        <td className="p-2.5">Store Id</td>
                        <td className="p-2.5">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {employees?.map(employee => (
                        <tr key={employee.emp_id}>
                            <td className="p-2.5 flex">{employee.emp_fname} {employee.emp_lname}</td>
                            <td className="p-2.5">{employee.emp_email}</td>
                            <td className="p-2.5">{employee.date_of_hire}</td>
                            <td className="p-2.5">{employee.emp_jobtitle}</td>
                            <td className="p-2.5">{employee.store_id}</td>
                            <td className="p-2.5 flex flex-row">
                                <button onClick={() => handleEdit(employee)} className="p-2.5 bg-green-700 text-black rounded-lg mr-2">Edit</button>
                                {employee.emp_jobtitle !== 'Administrator' && (
                                <button  className="p-2.5 bg-red-700 text-black rounded-lg">Delete</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    );
}

export default Employee;