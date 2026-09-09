'use client'

import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Messages() {

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchMessages = async () => {
        try {

            const res = await fetch("/api/messages")
            const data = await res.json()
            setMessages(data)

        } catch(e) {
            console.error("Failed to load messages", e)

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!newMessage.trim()) return

        setLoading(true)

        try{
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({text: newMessage})
            })

            const data = await res.json()

            console.log(data)

            if(data.success) {
                setNewMessage("")
                await fetchMessages()
            } else{
                alert("failed to save message")
            }

        } catch(e){

            console.error("Error to submit message", e)

        } finally {

            setLoading(false)
        }

    }

// Fetch the messages
    useEffect(()=> {
        fetchMessages()
    }, [])


    // Create connecton to server-sent events (SSE) endpoint. Browser will keep connection open to receive updates.

    useEffect(()=> {
        const eventSource = new EventSource("/api/messages/stream")

        eventSource.onmessage = (event) => {
            const newMessage = JSON.parse(event.data)

            if(newMessage.type === "connected") {

                toast.success("Connected successfully!")

            } else {
                setMessages((prev) => [...prev, newMessage])
            }
        }


        // Cleanup
        return () => {eventSource.close()}
    }, [])

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <ul className="space-y-2 mb-6">

                {messages.map((message) => (
                    <li
                    key={message.id}
                    className="p-3 border rounded-md bg-gray-100 dark:bg-gray-800"
                    >
                        <p className="font-semibold"> {message.user_name  || "Anonymous"}</p>
                        <p>{message.text}</p>
                        <span className="text-xs text-gray-500"> {message.created_at}</span>
                    </li>
                ))}

            </ul>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type new message..."
                    required
                    disabled = {loading}
                    className="border px-3 py-2 flex-grow rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />

                <button type="submit" disabled={loading} className={`px-4 py-2 rounded-md text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-7y00"}`}>
                    {loading ? "Sending..." : "Send"}
                </button>

            </form>
        </div>
    )
}