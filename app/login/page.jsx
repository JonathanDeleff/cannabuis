"use client";
import LoginForm  from '../../components/login/loginForm';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// code should handle fetching just the target employee data
//will require login logic for routing after login is confirmed
//password hashing not a must right now but will be later on
const Login = () => {

    const [employee, setEmployee] = useState([]);
    const [loginState, setLoginState] = useState({
        failed: false,
        failText: ""
    });

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
                    setLoginState({
                        failed: true,
                        failText: "Password is incorrect."
                    });
                }
            } else { 
                console.error('Login failed.');
                setLoginState({
                    failed: true,
                    failText: "Please input a valid email."
                });
            }
        } catch (error) {
            console.error('Error fetching employee data', error);
            setLoginState({ ...loginState, failed: true });
        }
    };

    return (
        <div>
            <LoginForm onSubmit={onSubmit} loginFailed={loginState.failed} failText={loginState.failText} />
        </div>
    );
}

export default Login; 