import type { EmployeeType, StoreType } from "@/app/types/dashboardTypes/types";
import { useState } from 'react';

interface NewEmpProps {
    newEmployee: EmployeeType;
    setAddNew: React.Dispatch<React.SetStateAction<boolean>>;
    stores: StoreType[];
}

const AddEmployee: React.FC<NewEmpProps> = ({ newEmployee, setAddNew, stores }) => {

    const [formData, setFormData] = useState<EmployeeType>(newEmployee);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/employees/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Employee added');
            } else {
                console.error('Failed to update employee');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-1 bg-bg p-3 rounded-lg shadow-md shadow-slate-700 w-96"
            > 
                <input 
                    name="emp_fname"
                    placeholder="Employee First Name" 
                    type="text" 
                    value={formData.emp_fname}
                    onChange={handleChange}
                />
                <input 
                    name="emp_lname"
                    placeholder="Employee Last Name" 
                    type="text" 
                    value={formData.emp_lname}
                    onChange={handleChange}
                />
                <input 
                    name="emp_email"
                    placeholder="Employee Email" 
                    type="text" 
                    value={formData.emp_email}
                    onChange={handleChange}
                />
                <input 
                    name="emp_jobtitle"
                    placeholder="Employee Job Title" 
                    type="text" 
                    value={formData.emp_jobtitle}
                    onChange={handleChange}
                />
                <input 
                    name="date_of_hire"
                    placeholder="Date of Hire" 
                    type="text" 
                    value={formData.date_of_hire}
                    onChange={handleChange}
                />
                <input 
                    name="password"
                    placeholder="Password" 
                    type="text" 
                    value={formData.password}
                    onChange={handleChange}
                />
                <select 
                    name="store_id"  
                    value={formData.store_id}
                    onChange={handleChange}
                >
                    <option value="">Select Store</option>
                    {stores.map(store => (
                        <option key={store.store_id} value={store.store_id}>{store.store_name}</option>
                    ))}
                </select>
                <button type="submit" className="p-2.5 bg-green-700 text-white rounded-lg">Add Employee</button>
                <button 
                    type="button" 
                    onClick={() => setAddNew(false)} 
                    className="p-2.5 bg-red-700 text-white rounded-lg"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default AddEmployee;
