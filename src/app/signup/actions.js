"use server"

import db from "@/lib/dbsetup";
import z from "zod";
import bcrypt from "bcrypt"
import crypto from "crypto"
import { sendEmail } from "@/lib/sendEmail";

const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be under 50 characters" }),

  email: z.string().email({
    message: "Please enter a valid email address",
  }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password is too long" }),
});


export async function signupUser(formData) {

    const name = formData.get("name")?.trim() || ""
    const email = formData.get("email")?.trim() || ""
    const password = formData.get("password")?.trim() || ""

    const validation = signupSchema.safeParse({name, email, password})

    if(!validation.success) {
        const firstError = validation.error.errors[0]
        return {success: false, error: firstError}
    }

    const existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email)

    if(existingUser) {
        return {success: false, error: "Email is already registered"}
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const verificationToken = crypto.randomBytes(32).toString("hex")

const result = db.prepare(`
        INSERT INTO users (name, email, password, email_verified, verification_token, is_admin)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, email, hashedPassword, 0, verificationToken, 0);

    const newUser = db.prepare("SELECT id, name, email FROM users WHERE id = ?").get(result.lastInsertRowid)

    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${verificationToken}`

    const html = `
        <h2>Welcome to Our app, ${name}!</h2>
        <p>Thanks for signing up. Please virify your email by clickling bellow</p>
        <p><a href="${verifyUrl}" target="_blank" style="color: blue;">Verify my Email</a></p>
        <p>If you didn't create this acount, you can safely ignore this email</p>
    `

    const emailSent = await sendEmail({to: email, subject: "Verify your email address", html})

    if(!emailSent) {
        console.warn("Email sending failed")
    }

    return {success: true, user:newUser}

}