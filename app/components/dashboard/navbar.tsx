"use client"
import { usePathname } from 'next/navigation';
import { MdSearch } from 'react-icons/md';

export default function Navbar() {
    
    const pathname = usePathname()
    
    return (
        <div className="p-5 rounded-lg bg-bgSoft flex items-center justify-between shadow-lg shadow-slate-700">
            <div className="text-textSoft font-bold capitalize">
                {pathname.split("/").pop()}
            </div>
        </div>
    )
}