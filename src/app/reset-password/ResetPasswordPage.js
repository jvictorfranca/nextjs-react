"use client"

import FormError from "@/components/FormError"
import SubmitButton from "@/components/SubmitButton"
import { inputClass } from "@/lib/styles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { resetPassword } from "./actions"
import toast from "react-hot-toast"

const passwordSchema = z.object({
    password:z.string().min(8, {message: "Password must be at least 8 chars"}).max(100, {message: "Password must be at max 100 chars"})
})

export default function ResetPasswordPage () {

    const router = useRouter()

    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const [loading, setLoading] = useState(false)

    const {register, handleSubmit, formState: {errors}, reset} = useForm({resolver: zodResolver(passwordSchema)})

    const onSubmit = async (data) => {

        setLoading(true)

        try{
            const formData = new FormData()
            formData.append("token", token)
            formData.append("password", data.password)

            const result = await resetPassword(formData)

            if(result.success) {
                toast.success("Password reset successfully! You can log in")
                reset()
                router.push("/login")
            } else {
                Toaster.error(result.error || "Reset failed")
            }

        } catch (e) {

            console.error(e)
            toast.error("Request failed")

        } finally {
            setLoading(false)
        }

    }

    if(!token) {
        return <p className="p-6 text-center text-red-500">Invalid reset link.</p>
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">
                Reset password
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                {/* Password input */}
                <div>
                    <input type="password" placeholder="Your password" className={inputClass} {...register('password')} disabled={loading}/>
                    <FormError>{errors?.password?.message}</FormError>
                </div>

                <SubmitButton isLoading={loading} loadingText="Resetting...">
                    Reset Pasword
                </SubmitButton>

            </form>
        </div>
    )



}