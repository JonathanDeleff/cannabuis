"use client";
import LoginForm  from '../../components/login/loginForm';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// code should handle fetching just the target employee data
//will require login logic for routing after login is confirmed
//password hashing not a must right now but will be later on
const Login = () => {

    const [employee, setEmployee] = useState([]);
    const [loginFail, setLoginFail] = useState(false);
    const [loginFailText, setLoginFailText] = useState("");

    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch(`/api/login?emp_email=${email}`);
            if (response.ok) {
                const data = await response.json();

                if (data.password === password) {
                    setEmployee(await data);
                    router.push('/dashboard');
                } else {
                    setLoginFail(true);
                    setLoginFailText("Password is incorrect.");
                }
            } else { 
                console.error('Login failed.');
                setLoginFail(true);
                setLoginFailText("Please input a valid email.");
            }
        } catch (error) {
            console.error('Error fetching employee data', error);
            setLoginFail(true);
        }
    };

    return (
        <div>
            <LoginForm onSubmit={onSubmit} loginFailed={loginFail} failText={loginFailText} />
        </div>
    );
}

export default Login; 