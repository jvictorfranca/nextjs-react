'use server'
import db from "@/lib/dbsetup"
import bcrypt from "bcrypt"
import z from "zod"

const resetPasswordSchema = z.object({
    token:z.string().min(1, {message: "Token is required"}),
    password:z.string().min(8, {message: "Password must be at least 8 chars"}).max(100, {message: "Password must be at max 100 chars"})
})

export async function resetPassword (formData) {
    const token = formData.get("token")
    const password = formData.get("password")

    const validation = resetPasswordSchema.safeParse({token, password})

    if(!validation.success) {
        const firstError = validation.error.errors[0]
        return {success: false, error: firstError.message}
    }

    try {
        const user = db.prepare("SELECT * FROM users WHERE password_reset_token = ? AND password_reset_expires > ?").get(token, new Date().toISOString())

        if (!user) {
            return {success: false, error: "Invalid or expired token"}
        }

        const hasehd = await bcrypt.hash(password, 10)

        db.prepare(`
                UPDATE users
                SET password = ?, password_reset_token = NULL, password_reset_expires = NULL
                WHERE id = ?
            `).run(hasehd, user.id)
        
        return {success: true}
    } catch (e) {
        console.error("Reset password error: ", e)
        return {success: false, error: "Failed to reset password"}

    }

}