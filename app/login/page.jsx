"use client";
import LoginForm  from '../../components/login/loginForm';
import { useState, useEffect } from 'react';

// code should handle fetching just the target employee data
//will require login logic for routing after login is confirmed
//password hashing not a must right now but will be later on
const Login = () => {

    const [employee, setEmployee] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        try {
            const response = await fetch(`/api/login?emp_email=${email}`);
            if (response.ok) {
                const data = await response.json();
                setEmployee(data);
            } else { 
                console.error('Login failed.');
            }
        } catch (error) {
            console.error('Error fetching employee data', error);
        }
    };

    return (
        <div>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    );
}

export default Login; 