"use client"

import { useEffect, useState } from "react"
import { getMessages } from "./action"
import { formatDistanceToNow } from "date-fns"




export default function MessagesList ({courseId}) {
    
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    
    
    useEffect(()=> {
        const fetchMessages = async () => {
            setLoading(true)
            try {
                // Using route API. Legacy
                // const res = await fetch("/api/messages")
                // const data = await res.json()
                const data = await getMessages(courseId)

                console.log(data)

                setMessages(data.reverse())
    
            } catch(e) {
                console.error("Failed to load messages", e)
    
            }

            setLoading(false)
        }


        fetchMessages()

    }, [courseId])
    
    
    
    
    // // Fetch the messages
    
    
        // Create connecton to server-sent events (SSE) endpoint. Browser will keep connection open to receive updates.
    
        // useEffect(()=> {
        //     const eventSource = new EventSource("/api/messages/stream")
    
        //     eventSource.onmessage = (event) => {
        //         const newMessage = JSON.parse(event.data)
    
        //         if(newMessage.type === "connected") {
    
        //             toast.success("Connected successfully!")
    
        //         } else {
        //             setMessages((prev) => [...prev, newMessage])
        //         }
        //     }
    
    
        //     // Cleanup
        //     return () => {eventSource.close()}
        // }, [])

        if(loading) return <p>Loading messages...</p>

        return(
            <div>
                <p>Hello</p>
                <ul className="space-y-2 mb-6">
                
                    {messages.map((message) => (
                        <li
                        key={message.id}
                        className="p-3 border rounded-md bg-gray-100 dark:bg-gray-800"
                        >
                            <p className="font-semibold"> {message.user_name  || "Anonymous"}</p>
                            <p>{message.text}</p>
                            <span className="text-xs text-gray-500"> {formatDistanceToNow(new Date(message.created_at + "Z"), {addSuffix: true})}</span>
                        </li>
                    ))}
                
                </ul>
            </div>
        )
}