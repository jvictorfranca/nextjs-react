'use client'

import FormError from "@/components/FormError"
import SubmitButton from "@/components/SubmitButton"
import { inputClass } from "@/lib/styles"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"
import { getCourses } from "./action"
import CourseCard from "../courses/CourseCard"

const messageSchema = z.object({
    text: z.string().min(1, {message: "Message cannot be empty"}).max(500, {message: "Message is too long. Maximum 500 chars"})
})



export default function Messages() {

    // Check user session:

    const {status} = useSession()

    const [selectedCourse, setSelectedCourse] = useState(0)
    const [courses, setCourses] = useState([])

    // Fetch courses on mount

    useEffect( () => {
        console.log("Fetching courses")

        const fetchCourses  = async () => {

            try{
                const data = await getCourses()
                setCourses(data)
    
                if(data.length > 0) {
                    if(!selectedCourse || selectedCourse === 0) {
                        setSelectedCourse(data[0].id)
                    }
                }
    
            } catch (e) {
                console.error("Error fetching courses", e)
            }
        }

        if(status === "authenticated") {
            fetchCourses()
        }


    }, [status])


    // const [messages, setMessages] = useState([])

      const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}
      }  = useForm({
        resolver: zodResolver(messageSchema),
        defaultValues: {text:""}
      })

      const onSubmit = async (values) => {
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


    // const fetchMessages = async () => {
    //     try {

    //         const res = await fetch("/api/messages")
    //         const data = await res.json()
    //         setMessages(data)

    //     } catch(e) {
    //         console.error("Failed to load messages", e)

    //     }
    // }




// // Fetch the messages
//     useEffect(()=> {
//         fetchMessages()
//     }, [])


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

    if(status === "loading") {
        return <p className="p-6 text-center">Loading session...</p>
    }

    if(status === "unauthenticated") {
        return (
            <div className="p-6 text-center">
                <p className="mb-4">You must be logged in to view messages</p>
                <button onClick={()=>{signIn()}} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">Login</button>
            </div>
        )
    }

    return (
        <div className="p-6 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Chat room</h1>
            {/* <ul className="space-y-2 mb-6">

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

            </ul> */}

            {/* Wrapper column div */}
            <div className="flex flex-col lg:flex-row gap:6">
                <div className="lg:w-2/5 xl:w-1/3">
                    {courses.length > 0 && selectedCourse && (
                        <div className="lg:sticky lg:top-6">
                            <CourseCard 
                                course={courses.find(c=> c.id === selectedCourse)}
                                showDescription={false}
                                showViewDetailsButton={false}
                            />

                        </div>
                    )}

                    <div className="mt-4">
                        <label className="block mb-1 font-semibold">Select Course: </label>
                        <select 
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(Number(e.target.value))}
                            className="border px-3 py-2 rounded-md w-full dark:bg-gray-700 dark:text-white"
                        >
                            {courses.map((c) => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                        </select>

                    </div>
                    

                </div>


                {/* Form div */}
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="flex flex-col mt-4 gap-2">
                        {/* Message input */}
                        <input type="text" placeholder="Your message" className={inputClass} {...register('message')} disabled={isSubmitting} required/>
                            <FormError>{errors?.message?.message}</FormError>

                        {/* Submit button */}
                        <SubmitButton isLoading={isSubmitting} loadingText="Sending...">
                            Send
                        </SubmitButton>

                    </form>
                </div>
            </div>
        </div>
    )
}