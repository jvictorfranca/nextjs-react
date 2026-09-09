import db from "@/lib/db"
import { broadcastMessage } from "./stream/route"

export async function GET () {

    try{

        const messages = db.prepare("SELECT id, text, created_at FROM messages ORDER BY id ASC").all()
        
        return Response.json(messages)
    } catch (e) {

        console.error("Error reading messages", e)

        return Response.json({error: "Failed to  read messages"}, {status: 500})

    }
}

export async function POST (request) {

    try{
        const {text} = await request.json()
        
        const stmt = db.prepare("INSERT INTO messages (text) VALUES (?)")
        const result = stmt.run(text)

        const messageWithId = db.prepare("SELECT * FROM messages WHERE id = ?").get(result.lastInsertRowid)

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