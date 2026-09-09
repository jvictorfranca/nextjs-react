import db from "@/lib/dbsetup"
import { broadcastMessage } from "./stream/route"

export async function GET () {

    try{

        const messages = db.prepare(`
            SELECT m.id, m.text, m.created_at, u.name AS user_name
            FROM messages m
            LEFT JOIN users u ON m.user_id = u.id
            ORDER BY m.id ASC;
            `).all()
        
        return Response.json(messages)
    } catch (e) {

        console.error("Error reading messages", e)

        return Response.json({error: "Failed to  read messages"}, {status: 500})

    }
}

export async function POST (request) {

    try{
        const {text} = await request.json()

        const userIds = db.prepare("SELECT id FROM users").all().map(u => u.id)
        const randomUser = userIds[Math.floor(Math.random()*userIds.length)]
        
        const stmt = db.prepare("INSERT INTO messages (user_id, text) VALUES (?, ?)")
        const result = stmt.run(randomUser, text)

        const messageWithId = db.prepare(`
                SELECT m.id, m.text, m.created_at, u.name AS user_name
                FROM messages m
                LEFT JOIN users u ON m.user_id = u.id
                WHERE m.id = ?;
            `).get(result.lastInsertRowid)

        // Broadcast new message
        broadcastMessage(messageWithId)

        return Response.json({
            success: true,
            message: "Message saved with success!",
            data: messageWithId
        })

    } catch(e) {
        console.error("Error saving message", e)
    }
}