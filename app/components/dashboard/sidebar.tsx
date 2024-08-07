import MenuLink from './menuLink';
import Image from 'next/image';
import { auth, signOut } from '@/auth';
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdMoneyOff, 
    MdLogout,
    MdAssignment,
} from "react-icons/md";
import { TbShoppingBagPlus, TbShoppingBagMinus } from "react-icons/tb";

const menuItems = [
    {
        title: "Pages",
        list: [
            { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
            { title: "Employees", path: "/dashboard/employees", icon: <MdSupervisedUserCircle /> },
            { title: "Sales", path: "/dashboard/sales", icon: <TbShoppingBagPlus /> },
            { title: "Transactions", path: "/dashboard/transactions", icon: <MdAttachMoney /> },
            { title: "Orders", path: "/dashboard/orders", icon: <MdAssignment /> },
        ],
    },
    {
        title: "Analytics",
        list: [
            { title: "Reports", path: "/dashboard/reports", icon: <MdAnalytics /> },
        ],
    },
    {
        title: "User",
        list: [],
    },
    
];

const Sidebar = async () => {
    const session = await auth();
    return (
        <div className="sticky top-10 w-full ">
            <div className="flex items-center gap-5 mb-5">
                <Image className="rounded-full object-cover" priority={true} src="/noavatar.png" alt="User Avatar" width={50} height={50} />
                <div className="flex flex-col">
                    <span className="font-medium">{session?.user?.name}</span>
                    <span className="text-xs text-textSoft">{session?.user?.jobTitle}</span>
                </div>
            </div>
            <ul className="list-none">
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className="text-textSoft font-bold text-sm mt-2.5">{cat.title}</span>
                        {cat.list.map((item) => (
                            <MenuLink key={item.title} item={item} />
                        ))}
                    </li>
                ))}
            </ul>
            <form action={async () => {
                'use server'
                await signOut();
              }}
            >
                <button className="p-5 mt-1.5 flex items-center gap-2.5 cursor-pointer rounded-lg bg-none border-none w-full hover:bg-hover" >
                    <MdLogout />
                    Logout
                </button>
            </form>
        </div>
    );
}

export default Sidebar;