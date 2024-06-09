import Sidebar from "../../components/dashboard/sidebar";
import Navbar from "../../components/dashboard/navbar";


const Layout = ({ children }) => {
    return (
        <div className='flex bg-bg'>
            <div className='flex bg-bgSoft p-5 w-72 max-h-screen'>
                <Sidebar/>
            </div>
            <div className='flex-1 p-5 h-screen overflow-auto'>
                <Navbar/>
                {children}
            </div>
        </div>
    )
}

export default Layout;