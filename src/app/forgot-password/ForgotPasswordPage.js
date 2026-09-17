"use client"

import FormError from "@/components/FormError"
import SubmitButton from "@/components/SubmitButton"
import { inputClass } from "@/lib/styles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { sendResetEmail } from "./actions"
import toast from "react-hot-toast"
import { useState } from "react"

const forgotPasswordSchema = z.object({
    email: z.string().email({message: "Please enter a valid email address"})
   })

   export default function ForgotPasswordPage () {

    const [loading, setLoading] = useState(false)

    const {register, handleSubmit, reset, formState: {errors}} =  useForm({resolver: zodResolver(forgotPasswordSchema), defaultValues: {email: ""}})

    const onSubmit = async (data) => {
        setLoading(true)

        try{
            const formData = new FormData()
            formData.append("email", data.email)

            const result = await sendResetEmail(formData)

            if(result.success) {
                toast.success("If that email exists, a reset link has been sent!")
                reset()
            } else{

                toast.error(result.error || "Something went wrong")
            }

        } catch (e) {
            console.error("Forgot password error:", e)
            toast.error("Request failed. Please try again")
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Forgot password</h1>
            <p className="text-sm text-gray-600 mb-4">
                Enter your email and we will send you a link to reset your password
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                {/* Email input */}
                <div>
                    <input type="email" placeholder="Your email" className={inputClass} {...register('email')} disabled={loading}/>
                    <FormError>{errors?.email?.message}</FormError>
                </div>

                <SubmitButton isLoading={loading} loadingText="Sending...">
                    Send Reset Link
                </SubmitButton>

            </form>

        </div>
    )
}