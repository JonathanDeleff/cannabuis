"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuLinkItem } from "@/app/types/dashboardTypes/types";

const MenuLink: React.FC<{ item: MenuLinkItem }> = ({ item }) => {
    const pathname = usePathname();
    const isActive = pathname === item.path;

    return (
        <Link href={item.path}>
            <div className={`flex p-5 items-center gap-2.5 mt-2.5 rounded-lg hover:bg-hover ${isActive ? 'bg-hover' : ''}`}>
                {item.icon}
                <span>{item.title}</span>
            </div>
        </Link>
    );
};

export default MenuLink;
