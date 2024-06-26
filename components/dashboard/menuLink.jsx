"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MenuLink({item}) {
    
    const pathname = usePathname()
    const isActive = pathname === item.path
    
    return (
        <Link href={item.path} className={`flex p-5 items-center gap-2.5 mt-2.5 rounded-lg hover:bg-hover ${isActive ? 'bg-hover' : ''}`}>
           {item.icon}
           {item.title} 
        </Link>
    )
} 
