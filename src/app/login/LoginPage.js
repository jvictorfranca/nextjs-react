'use client'

import FormError from "@/components/FormError"
import SubmitButton from "@/components/SubmitButton"
import { inputClass } from "@/lib/styles"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"

const loginSchema = z.object({
    email: z.string().email({message: "Please enter a valid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"})
})

export default function LoginPage () {

    const router = useRouter()

      const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}
      }  = useForm({
        resolver: zodResolver(loginSchema)
      })

      const onSubmit = async (data) => {
        const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password
        })

        if(res?.error) {
            toast.error("Invalid email or password")
        } else {
            toast.success("Login Successful")
            router.push("/chat")
        }
      }
    

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <div className="p-8 border rounded-lg shadow-md bg-white dark:bg-gray-800 w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}    
                            className={inputClass}
                        />
                        <FormError>{errors.email?.message}</FormError>

                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password")}    
                            className={inputClass}
                        />
                        <FormError>{errors.password?.message}</FormError>

                        <SubmitButton isLoading={isSubmitting} loadingText="Loggin in...">
                            Login
                        </SubmitButton>


                    </div>

                </form>

                <Link
                    href="/forgot-password"
                    className="text-blue-600 hover:underline"
                >
                    Forgot password?
                </Link>
            
            </div>
        </div>
    )
}

