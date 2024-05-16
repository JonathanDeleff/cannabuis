import Search from "@/app/components/dashboard/search";
import Link from 'next/link';
import Image from 'next/image';
import Pagination from "@/app/components/dashboard/pagination";

// table will be replaced with component later, much the way we rendered items for webDev will need logic for max items per page
const EmployeesPage = () => {
    return (
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
            <div className="flex items-center justify-between">
                <Search placeholder='Search for an employee'/>
                <Link href={"/dashboard/employees/add"}>
                    <button className="p-2.5 bg-button text-black rounded-lg">Add New</button>
                </Link>
            </div>
            <table className="w-full ">
                <thead>
                    <tr>
                        <td className="p-2.5">Name</td>
                        <td className="p-2.5">Email</td>
                        <td className="p-2.5">Created At</td>
                        <td className="p-2.5">Role</td>
                        <td className="p-2.5">Status</td>
                        <td className="p-2.5">Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2.5">
                            <div className="flex gap-2.5 items-center">
                                <Image src="/noavatar.png" alt="" width={40} height={40} className="rounded-full object-cover"/>John Doe
                            </div>
                        </td>
                        <td className="p-2.5">john@fakeemail.com</td>
                        <td className="p-2.5">13.01.2022</td>
                        <td className="p-2.5">Admin</td>
                        <td className="p-2.5">Active</td>
                        <td className="p-2.5">
                            <div className="flex gap-2.5">
                                <Link href="/">
                                    <button className="px-2.5 py-1 rounded-md cursor-pointer bg-teal-700" >View</button>                                
                                </Link>
                                <Link href="/">
                                    <button className="px-2.5 py-1 rounded-md cursor-pointer bg-red-700">Delete</button>
                                </Link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination/>
        </div>
    );
}

export default EmployeesPage;