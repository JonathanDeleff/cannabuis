import MenuLink from './menuLink'
import Image from 'next/image'
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
    MdAssignment,
  } from "react-icons/md";

const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "Employees",
          path: "/dashboard/employees",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Sales",
          path: "/dashboard/sales",
          icon: <MdShoppingBag />,
        },
        {
          title: "Transactions",
          path: "/dashboard/transactions",
          icon: <MdAttachMoney />,
        },
        {
          title: "Order",
          path: "/dashboard/order",
          icon: <MdAssignment />,
        },
        {
          title: "Orders",
          path: "/dashboard/orders",
          icon: <MdAssignment />,
        },
      ],
    },
    {
      title: "Analytics",
      list: [
        {
          title: "Revenue",
          path: "/dashboard/revenue",
          icon: <MdWork />,
        },
        {
          title: "Reports",
          path: "/dashboard/reports",
          icon: <MdAnalytics />,
        },
        {
          title: "Teams",
          path: "/dashboard/teams",
          icon: <MdPeople />,
        },
      ],
    },
    {
      title: "User",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon: <MdHelpCenter />,
        },
      ],
    },
  ];


export default function Sidebar() {
    return (
        <div className='sticky top-10 w-full'>
            <div className='flex items-center gap-5 mb-5'>
                <Image className='rounded-full object-cover' priority={true} src="/noavatar.png" alt="" width="50" height="50"/>
                <div className='flex flex-col'>
                  {/* will need a restructure when we have a backend */}
                    <span className='font-medium'>John Doe</span>
                    <span className='text-xs text-textSoft'>Admin</span>
                </div>
            </div>
            <ul className='list-none'>
            {menuItems.map(cat=>(
                <li key={cat.title}>
                    <span className='text-textSoft font-bold text-sm mt-2.5'>{cat.title}</span>
                    {cat.list.map(item => (
                        <MenuLink key={item.title} item={item}/>
                    
                    ))}
                </li>
            ))}
           </ul>
           <button className='p-5 mt-1.5 flex items-center gap-2.5 cursor-pointer rounded-lg bg-none border-none w-full hover:bg-hover'>
            <MdLogout />
            Logout
            </button>
        </div>
    )
}
