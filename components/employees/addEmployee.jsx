const AddEmployee = ( {newEmployee} ) => {
    return (
        <div>
            <form> 
                <input placeholder="employee id" type="text" value={newEmployee.employee_id}/>
                <input placeholder="Employee First Name" type="text" value={newEmployee.emp_fname}/>
                <input placeholder="Employee Last Name" type="text" value={newEmployee.emp_lname}/>
                <input placeholder="Employee Email" type="text" value={newEmployee.emp_email}/>
                <input placeholder="Employee Job Title" type="text" value={newEmployee.emp_jobtitle}/>
                <input placeholder="Date of Hire" type="text" value={newEmployee.date_of_hire}/>
                <input placeholder="Password" type="text" value={newEmployee.password}/>
                <input placeholder="Store ID" type="text" value={newEmployee.store_id}/>
                <button type="submit" >Add Employee </button>
            </form>
        </div>
    );
}
    export default AddEmployee;