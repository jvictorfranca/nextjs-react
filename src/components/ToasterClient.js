// Component used to show that third party libs that relay on react client capabilities such as UseEffect and UseStated should be
// wrapped by a client component as best practices.
'use client'

import { Toaster } from "react-hot-toast";


export default function ToasterClient () {
    return (
        <Toaster position="top-right" reverseOrder={false} />
    )
}