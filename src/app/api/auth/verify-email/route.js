import db from "@/lib/dbsetup"


export async function GET(request) {
    const {searchParams} = new URL(request.url)

    const token = searchParams.get("token")

    if(!token) {
        return Response.json({error: "Missing token"}, {status: 400})
    }

    const user = db.prepare("SELECT * FROM users WHERE verification_token = ?").get(token)
    
    if(!user) {
        return Response.json({error: "Invalid or expired token"}, {status: 400})
    }

    db.prepare("UPDATE users SET email_verified = 1, verification_token = NULL WHERE id = ?").run(user.id)

    return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify-email/success`)
}