

// login with no backend logic
const Login = () => {
    return (
        <div className="w-screen h-screen flex grow justify-center items-center bg-[url(/cannabis1.jpg)] bg-cover">
            <form action="" className="bg-bgSoft p-12 rounded-lg flex flex-col justify-center gap-8 items-center" >
                <h1 className="text-2xl font-bold">Login</h1>
                <input type="text" placeholder="username" className="p-8 border-2 rounded-md bg-hover" />
                <input type="password" placeholder="password" className="p-8 border-2 rounded-md bg-hover text-white" />
                <button className="p-8 bg-button text-black cursor-pointer rounded-lg w-full">Login</button>
            </form>
        </div>
    );
}

export default Login; 