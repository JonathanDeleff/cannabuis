import type { EmployeeType } from '@/app/types/dashboardTypes/types';
import { useState } from 'react';

interface EditProps {
    employee: EmployeeType;
    cancelEdit: () => void;
    updateEmployee: (updatedEmployee: EmployeeType) => void;
}

const EditEmployee: React.FC<EditProps> = ({ employee, cancelEdit, updateEmployee}) => {

    const [formData, setFormData] = useState<EmployeeType>(employee);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCancel = () => {
        cancelEdit();
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/employees/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                updateEmployee(formData);
            } else {
                console.error('Failed to update employee');
                // Handle error response
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network error
        }
    };

    

    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-1 bg-bg p-3 rounded-md w-96'>
                <input type='text' name='emp_fname' value={formData.emp_fname} onChange={handleChange}/>
                <input type='text' name='emp_lname' value={formData.emp_lname} onChange={handleChange}/>
                <input type='text' name='emp_email' value={formData.emp_email} onChange={handleChange}/>
                <input type='text' name='emp_jobtitle' value={formData.emp_jobtitle} onChange={handleChange}/>
                <input type='text' name='store_id' value={formData.store_id} onChange={handleChange}/>
                <div className='flex flex-row justify-between p-0.5'>
                <button type="submit" className="p-2.5 bg-green-700 text-white rounded-lg">Update</button>
                <button type="button" onClick={handleCancel} className="p-2.5 bg-red-700 text-white rounded-lg">Cancel</button>
                </div>

            </form>
        </div>
    );
}

export default EditEmployee;
