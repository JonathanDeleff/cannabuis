import Sidebar from "../components/dashboard/sidebar";
import Navbar from "../components/dashboard/navbar";


const Layout = ({ children }) => {
    return (
        <div className='flex'>
            <div className='flex w-1/4 bg-bgSoft p-5'>
                <Sidebar/>
            </div>
            <div className='flex-1 p-5'>
                <Navbar/>
                {children}
            </div>
        </div>
    )
}

export default Layout;