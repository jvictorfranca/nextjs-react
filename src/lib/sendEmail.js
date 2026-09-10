import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)   

export async function sendEmail({to, subject, html}) {

    try{

        const {data, error} = await resend.emails.send ({
            from: "Joao <onboarding@resend.dev>",
            to,
            subject,
            html
        })
        
        if (error) {
            
            console.error("Resend Error", error)
            return false
        }

        return true

    } catch(e) {

        console.error("Email sent failed", e)
        return false

    }
}