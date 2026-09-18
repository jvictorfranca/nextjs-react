"use client"

import FormError from "@/components/FormError"
import SubmitButton from "@/components/SubmitButton"
import { inputClass } from "@/lib/styles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"
import { signupUser } from "./actions"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import clsx from "clsx"



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

            {/* Divider */}
            <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-2 text-gray-500 text-sm">or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            {/* Oauth sign ups */}
            <div className="mt-6 flex flex-col gap-3">
                <button 
                    type="button"
                    onClick={()=> signIn("google")}
                    className={clsx(
                        "w-full py-2 border rounded-md flex justify-center items-center gap-2",
                        "transition shadow-sm font-medium cursor-pointer",
                        "bg-white text-gray-700 hover:bg-gray-100",
                        "dark:bg-gray-800 dark:text-gray-100 dark:hoverbg-gray-700"
                    )}
                    
                    >
                    <FcGoogle size={22}/>
                    <span className="font-medium">Sign up with Google</span>
                </button>
            </div>
        </div>
    )

}

