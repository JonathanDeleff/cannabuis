"use client"
import { usePathname } from 'next/navigation';
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md';

const Navbar = () => {
    
    const pathname = usePathname()
    
    return (
        <div className="p-5 rounded-lg bg-bgSoft flex items-center justify-between">
            <div className="text-textSoft font-bold capitalize">
                {pathname.split("/").pop()}
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-search rounded-lg p-1">
                    <MdSearch className='flex gap-2 text-black'/>
                    <input type="text" placeholder="Search..." className="bg-transparent border-none text-black p-1" />
                </div>
            </div>
        </div>
    )
}

export default Navbar;