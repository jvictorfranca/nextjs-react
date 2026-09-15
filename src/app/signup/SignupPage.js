"use client"

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
import { signupUser } from "./actions"


const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be under 50 characters" }),

  email: z.string().email({
    message: "Please enter a valid email address",
  }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password is too long" }),
});


export default function SignupPage () {

    const router = useRouter()

    const {register ,handleSubmit, reset, formState: {errors, isSubmitting}} = useForm({resolver: zodResolver(signupSchema)})

    const onSubmit = async (data) => {

        try{

            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("email", data.email)
            formData.append("password", data.password)

            const result = await signupUser(formData)

            router.push("/verify-email")

            if (result.success) {
                toast.success("Signup successful! Check your inbox to verify your email.")

                reset();
            } else {
                toast.error(result.error)
            }

        } catch (e) {
            toast.error(e.message || "signup failed - please try again")
        }

    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4"> Create an Account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col cap-3">

                <div>
                    <input
                        type="text"
                        placeholder="Full name"
                        {...register("name")}
                        className={inputClass}
                    />
                    <FormError>{errors.name?.message}</FormError>
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className={inputClass}
                    />
                    <FormError>{errors.email?.message}</FormError>
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className={inputClass}
                    />
                    <FormError>{errors.password?.message}</FormError>
                </div>

                <SubmitButton isLoading={isSubmitting} loadingText="Signing up...">
                    Sign up
                </SubmitButton>

            </form>
        </div>
    )

}

