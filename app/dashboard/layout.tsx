import Sidebar from "@/app/components/dashboard/sidebar";
import Navbar from "@/app/components/dashboard/navbar";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className='flex bg-bg'>
            <div className='flex bg-bgSoft p-5 w-72 h-screen'>
                <Sidebar/>
            </div>
            <div className='flex-1 p-5 max-h-screen overflow-auto'>
                <Navbar/>
                {children}
            </div>
        </div>
    );
}
