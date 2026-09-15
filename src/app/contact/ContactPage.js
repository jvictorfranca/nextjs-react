"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { sendContactMessage } from "./actions";
import FormError from "@/components/FormError";
import SubmitButton from "@/components/SubmitButton";
import { inputClass } from "@/lib/styles";


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

      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('message', data.message)
    
      const result = await sendContactMessage(formData)

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
        <input type="text" placeholder="Your name" className={inputClass} {...register('name')}/>
          <FormError>{errors?.name.message}</FormError>
        
        {/* Email input */}
        <input type="email" placeholder="Your email" className={inputClass} {...register('email')}/>
          <FormError>{errors?.email.message}</FormError>
        {/* Message input */}
        <textarea placeholder="Your message" className={inputClass} {...register('message')}/>
          <FormError>{errors?.message.message}</FormError>

        <SubmitButton>
          Send
        </SubmitButton>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" disabled={isSubmitting}>
            { isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
