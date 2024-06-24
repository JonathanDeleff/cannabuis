import React from 'react';
import { authenticate } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';


interface LoginFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loginFailed: boolean;
  failText: string;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <div className="w-screen h-screen flex flex-col grow justify-center items-center bg-[url(/cannabis1.jpg)] bg-cover">
      <form action={dispatch} className="bg-bg p-12 rounded-lg flex flex-col justify-center gap-8 items-center">
        <h1 className="text-2xl font-bold text-white">Login</h1>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="p-8 border-2 rounded-md bg-soft"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-8 border-2 rounded-md bg-hover text-white"
        />
        <LoginButton />
        {errorMessage && (
          <p className="text-white text-center rounded-lg w-full">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button className={`p-8 bg-button text-white cursor-pointer rounded-lg w-full ${pending ? 'opacity-50 cursor-wait' : ''}`} 
    aria-disabled={pending}
    disabled={pending}>
      Log in
    </button>
  )
}

export default LoginForm;
