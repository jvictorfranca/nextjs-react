'use client'

import ToasterClient from "@/components/ToasterClient"
import ThemeProvider from "@/context/ThemeContext"
import {SessionProvider} from "next-auth/react"



export default function Providers({children}) {
    return (
        <SessionProvider>
            <ThemeProvider>
                {children}
                <ToasterClient/>

            </ThemeProvider>
        </SessionProvider>
    )
}