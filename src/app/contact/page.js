"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";


const contactSchema = z.object ({
    name: z.string().min(2, {message: "Name must be at least 2 characters"}),
    email: z.string().email({message: "Please enter a valid email adress"}),
    message: z.string().min(5, {message: "Message must be at least 5 characters"})
})

export default function Contact() {

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting}
  }  = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data) => {
    try{

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {name: data.name, email: data.email, message: data.message } )
      })

      const result = await res.json()

      if(result.success) {
        toast.success("Message sent successfully!")
        reset()
      } else {
        toast.error(result.message || "Failed to send message. Please try again")
      }


    } catch(e) {

    }
  }


  return (
    <div>
      <h1>Contact Us</h1>
      <p>
        Have questions? Reach out to us at{" "}
        <a href="mailto:jvictorfranca@yahoo.com.br">jvictorfranca@yahoo.com.br</a>
      </p>
      <form className="space-y-4"  onSubmit={handleSubmit(onSubmit)}>
        {/* Name input */}
        <input type="text" placeholder="Your name" className="border px-3 py-2 w-full rounded-md dark:placeholder-white/70" {...register('name')}/>
          {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>)}
        
        {/* Email input */}
        <input type="email" placeholder="Your email" className="border px-3 py-2 w-full rounded-md dark:placeholder-white/70" {...register('email')}/>
          {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
        
        {/* Message input */}
        <textarea placeholder="Your message" className="border px-3 py-2 w-full rounded-md dark:placeholder-white/70" rows="4" {...register('message')}/>
          {errors.message && (<p className="text-red-500 text-sm mt-1">{errors.message.message}</p>)}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" disabled={isSubmitting}>
            { isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
