export default function Employee({ employees }) {    
    return (
        <div>
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
                            <td className="p-2.5">{employee.emp_fname} {employee.emp_lname}</td>
                            <td className="p-2.5">{employee.emp_email}</td>
                            <td className="p-2.5">{employee.date_of_hire}</td>
                            <td className="p-2.5">{employee.emp_jobtitle}</td>
                            <td className="p-2.5">{employee.store_id}</td>
                            <td className="p-2.5">
                                <button className="p-2.5 bg-green-700 text-black rounded-lg mr-2">Edit</button>
                                <button className="p-2.5 bg-red-700 text-black rounded-lg">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}