/*
* The sign in page for the app
* TODO: create functionality and do styling
*/

export const Login = () => {
    return (
        <div>
        <h1>Login</h1>
        <form>
            <label htmlFor="email">Email</label>
            <input className="text-black" id="email" type="email" />
            <label  htmlFor="password">Password</label>
            <input className='text-black' id="password" type="password" />
            <button type="submit">Login</button>
        </form>
        </div>
    );
};
