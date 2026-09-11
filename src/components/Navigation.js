'use client'

import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { useContext } from "react";

export default function Navigation () {
    const {theme, toggleTheme} = useContext(ThemeContext)

    return (
    <header className="bg-gray-100 p-4 shadow dark:bg-gray-600">
        <nav className="flex justify-between items-center">
        <ul className="flex gap-4"> 
            <li> <Link href="/"> Home </Link> </li>
            <li> <Link href="/about"> About </Link> </li>
            <li> <Link href="/about/team"> Team </Link> </li>
            <li> <Link href="/pokemons"> Pokemons </Link> </li>
            <li> <Link href="/contact"> Contact </Link> </li>
            <li> <Link href="/chat"> Chat </Link> </li>
            <li> <Link href="/checkout"> Checkout </Link> </li>
        </ul>
        {/* Theme toggle */}
        <button onClick={()=> {toggleTheme()}} className="px-3 py-1 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-slate-600 transition cursor-pointer"
 >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
        </nav>
    </header>
    )
}