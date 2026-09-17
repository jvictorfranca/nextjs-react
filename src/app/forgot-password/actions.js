"use server"

import db from "@/lib/dbsetup"
import { sendEmail } from "@/lib/sendEmail"
import crypto from "crypto"
import z from "zod"

const forgotPasswordSchema = z.object({
    email: z.string().email({message: "Please enter a valid email address"})
   })

export async function sendResetEmail(formData) {

    const email = formData.get("email")?.toString().trim() || ""

    const validation = forgotPasswordSchema.safeParse({email})

    if(!validation.success) {
        const firstError = validation.error.errors[0]
        return {success: false, error: firstError.message}
    }
    
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email)

    if (!user) {
        return {success: true}
    }

    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 1000*60*30).toISOString()

    db.prepare(`
            UPDATE users
            set password_reset_token = ?, password_reset_expires = ?
            WHERE id = ?
        `).run(token, expires,user.id)


    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`

    await sendEmail({
        to: email,
        subject: "Reset your password",
        html: `
            <p>Hello ${user.name || ""},</p>
            <p>Click the link below to reset your password:</p>
            <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>
            <p>This link will expire in 30 minutes.</p>
        `
        });

    return {success: true}
    
}