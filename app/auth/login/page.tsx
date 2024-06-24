"use client";
import LoginForm from '@/app/components/auth/loginForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmployeeType, LoginStateType } from '@/app/types/dashboardTypes/types';

export default function Login() {

    const [employee, setEmployee] = useState<EmployeeType[]>([]);
    const [loginState, setLoginState] = useState<LoginStateType>({
        failed: false,
        failText: ""
    });

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        console.log('Email:', email);
        console.log('Password:', password);

        if (!email || !password) {
            setLoginState({
                failed: true,
                failText: "Please enter both email and password."
            });
            return;
        }

        try {
            const response = await fetch(`/api/login?emp_email=${email}`);
            if (response.ok) {
                const data = await response.json();

                if (data.password === password) {
                    setEmployee([data]);
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
            setLoginState({ 
                failed: true,
                failText: "An error occurred. Please try again." 
            });
        }
    };

    return (
        <div>
            <LoginForm onSubmit={onSubmit} loginFailed={loginState.failed} failText={loginState.failText} />
        </div>
    );
}
