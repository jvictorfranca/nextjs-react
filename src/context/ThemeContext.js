'use client'

import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState("light")

    useEffect(()=> {
        document.documentElement.classList.remove("dark")
    }, [])

    const toggleTheme = () => {
        setTheme((prev) => {
            const nextTheme = prev === "light" ? "dark" : "light"

            if (nextTheme === "dark"){
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }

            return nextTheme
        })
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}