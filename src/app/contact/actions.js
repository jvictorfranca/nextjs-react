"use server"; // Required to mark this as a server action

import { sendEmail } from "@/lib/sendEmail";

export async function sendContactMessage (formData) {
    
    try {

        const name = formData.get('name')?.toString().trim() || ''
        const email = formData.get('email')?.toString().trim() || ''
        const message = formData.get('message')?.toString().trim() || ''

        if(!name || !email || !message) {
            return {success: false, message: "Missing fields" }
        }

    const html = `
        <h2>New Contact Message </h2>
        <p><strong>Name:</strong> ${name} </p>
        <p><strong>Email:</strong> ${email} </p>
        <p><strong>Message:</strong> ${message} </p>
    `




    const success = await sendEmail({
        to: "jvictorfranca133@gmail.com",
        subject: `Contact Form Message from ${name}`,
        html
    })

    
    if(success) {
        return {success: true}
    } else {
        return {success: false, message: "Failed to send email"}
    }

    
    } catch(e) {

        console.error(e)
        return {success: false, message: "Server error"}


    }
}