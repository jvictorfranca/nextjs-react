"use client"

import { useEffect, useRef, useState } from "react"
import { getMessages } from "./action"
import { formatDistanceToNow } from "date-fns"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"




export default function MessagesList ({courseId}) {
    
    const {data:session, status:sessionStatus} = useSession()

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const bottomRef = useRef(null)
    const PAGE_SIZE = 10
    
    const fetchMessages = async (newOffset = 0) => {
        // // Fetch the messages on the DB
        setLoading(true)
        try {
            // Using route API. Legacy
            // const res = await fetch("/api/messages")
            // const data = await res.json()
            const data = await getMessages(courseId, PAGE_SIZE, newOffset)

            console.log(data)

            if(newOffset === 0) {

                setMessages(data.reverse())
                bottomRef.current?.scrollIntoView({behaviour: "smooth"})
            } else {
                const reversedData = data.reverse()
                setMessages((prev) => [...reversedData, ...prev])

            }
            setHasMore(data.length === PAGE_SIZE)

        } catch(e) {
            console.error("Failed to load messages", e)

        } finally {

            setLoading(false)
        }

    }

    useEffect(()=> {
        if(sessionStatus !== "authenticated") {
            return
        }

        // Create connecton to server-sent events (SSE) endpoint. Browser will keep connection open to receive updates.

        const eventSource = new EventSource("/api/messages/stream")
    
            eventSource.onmessage = (event) => {
  
                const payload = JSON.parse(event.data)

                switch (payload.type) {
                    case "connected": 
                        console.log("connected")
                        toast.success("Connected successfully!")
                        break

                    case "new":
                        console.log("new")
                        const newMessage = payload.data
                        setMessages((prev)=>[...prev, newMessage])
                        break

                    default:
                        console.warn("Unknown SSE message type: ", payload)
                        break
                }
            }
    
    
            // Cleanup
            return () => {eventSource.close()}

    },[sessionStatus])
    
    useEffect(()=> {

        setOffset(0)


        fetchMessages(offset)

    }, [courseId])


    const loadMore = () => {
        const newOffset = offset + PAGE_SIZE

        setOffset(newOffset)

        fetchMessages(newOffset)
    }
    
    
    
    


        if(loading) return <p>Loading messages...</p>

        return(
            <div>
                {/* Load previous message button */}
                {hasMore && (
                    <button onClick={loadMore} className="mb-2 px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hober:bg-gray-600">
                        Load previous {PAGE_SIZE} messages
                    </button>
                )}
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
                <div ref={bottomRef}/>
            </div>
        )
}