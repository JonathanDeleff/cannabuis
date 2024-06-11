const LoginForm = ({ onSubmit }) => {
    return (
        <div className="w-screen h-screen flex grow justify-center items-center bg-[url(/cannabis1.jpg)] bg-cover">
            <form onSubmit={onSubmit} className="bg-bg p-12 rounded-lg flex flex-col justify-center gap-8 items-center">
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
                <button className="p-8 bg-button text-white cursor-pointer rounded-lg w-full">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;