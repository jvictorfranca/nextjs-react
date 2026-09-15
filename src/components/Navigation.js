'use client'

import { ThemeContext } from "@/context/ThemeContext";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";

export default function Navigation () {
    const {data: session} = useSession()
    const {theme, toggleTheme} = useContext(ThemeContext)
    const [isOpen, setIsOpen] = useState(false)

    const pathname = usePathname()

    const isActive = (href) => {
        return href === pathname
    }

    

    const themeToggleButton = (
        <button onClick={()=> {toggleTheme()}} className="px-3 py-1 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-slate-600 transition cursor-pointer"
 >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    )

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/about/team", label: "Team" },
        { href: "/pokemons", label: "Pokemons" },
        { href: "/courses", label: "Courses" },
        { href: "/contact", label: "Contact" },
        { href: "/chat", label: "Chat" },
        { href: "/checkout", label: "Checkout" },
        { href: "/debug/db", label: "Debug DB" },
    ]

    return (
    <header className="bg-gray-100 p-4 shadow dark:bg-gray-600">
        <nav className="flex justify-between items-center">
        
        <div className="flex items-center gap-4">
            <button className="md:hidden px-2 py-1 border rounded-md cursor-pointer" onClick={()=>{setIsOpen(!isOpen)}}>
                ≡
            </button>
            <ul className={clsx(
                "flex flex-col md:flex-row gap-4",
                "text-gray-900 dark:text-gray-100",
                "absolute md:static transition-all",
                isOpen ? "top-16 left-4" : "top-[-500px]",
                "bg-white dark:bg-slate-800 md:bg-transparent p-4 md:p-0 shadow md:shadow-none"
            )}>
                {navItems.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className={clsx(
                            "px-3 py-1 rounded-md transition",
                            "flex items-center justify-center text-center",
                            isActive(link.href) ? clsx(
                                "bg-blue-600 text-white dark:bg-blue-600",
                                "hover:bg-blue-700 dark:hover:bg-blue-700"
                            ) : "hover:bg-gray-200 dark:hover:bg-gray-700"

                        )}> {link.label} </Link>
                    </li>
                ))}

            </ul>
        </div>

        <div className="flex items-center gap-3">

            {
                !session ? 
                <>
                    <Link href="/login" className={clsx(
                        "px-3 py-1 text-sm rounded-md",
                        "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    )}>
                        Login
                    </Link>
                    <Link href="/login" className={clsx(
                        "px-3 py-1 text-sm rounded-md",
                        "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                    )}>
                        Sign up
                    </Link>
                </> : 
                <>
                    <span className="text-sm text-gray-700 dark:text-gray-200">Hi {session?.user?.name || session?.user?.email}</span>
                    <button onClick={()=> signOut()} className={clsx(
                        "px-3 py-1 text-sm rounded-md",
                        "bg-red-600 textwhite hover:bg-red-700 cursor-pointer"
                    )}>Logout</button>
                </>
            }

        {/* Theme toggle */}
        {themeToggleButton}
        </div>

        </nav>
    </header>
    )
}