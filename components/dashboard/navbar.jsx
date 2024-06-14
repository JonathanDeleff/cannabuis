"use client"
import { usePathname } from 'next/navigation';
import { MdSearch } from 'react-icons/md';

const Navbar = () => {
    
    const pathname = usePathname()
    
    return (
        <div className="p-5 rounded-lg bg-bgSoft flex items-center justify-between">
            <div className="text-textSoft font-bold capitalize">
                {pathname.split("/").pop()}
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-search rounded-lg p-1 border-solid border-border border-2">
                    <MdSearch className='flex gap-2 text-black'/>
                    <input type="text" placeholder="Search..." className="bg-transparent text-black p-1" />
                </div>
            </div>
        </div>
    )
}

export default Navbar;