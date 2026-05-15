'use client'
import Link from "next/link"
import { useUser, UserButton } from "@clerk/nextjs"
const AdminNavbar = () => {

    const {user} = useUser()

    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 transition-all">
            
            <Link href="/" className="relative text-2xl sm:text-4xl font-semibold text-white">
                <span className="text-green-600">Fesh</span>Tech
                <span className="text-green-600 text-3xl sm:text-5xl leading-0">.</span>
                <p className="absolute text-[9px] sm:text-xs font-semibold -top-1 -right-9 sm:-right-11 px-2 sm:px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                    Admin
                </p>
            </Link>
            <div className="flex items-center gap-3 text-3xl font-bold text-white">
                <p>Hi, {user?.firstName}</p>
                <UserButton />
            </div>
        </div>
    )
}

export default AdminNavbar