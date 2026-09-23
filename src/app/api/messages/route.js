import db from "@/lib/dbsetup"
import { broadcastMessage } from "./stream/route"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// export async function GET () {

//     try{

//         const messages = db.prepare(`
//             SELECT m.id, m.text, m.created_at, u.name AS user_name
//             FROM messages m
//             LEFT JOIN users u ON m.user_id = u.id
//             ORDER BY m.id ASC;
//             `).all()
        
//         return Response.json(messages)
//     } catch (e) {

//         console.error("Error reading messages", e)

//         return Response.json({error: "Failed to  read messages"}, {status: 500})

//     }
// }

export async function POST (request) {

    try{
        const session = await getServerSession(authOptions)
        if(!session?.user) {
            return Response.json(
                {error: "Unauthorized: Sign in to post a message"}, {status: 401}
            )
        }
        const {text, course_id} = await request.json()
        if(!text?.trim()) {
            return Response.json(
                {error: "Message text is required"}, {status: 400}
            )
        }

        if(!course_id) {
        return Response.json(
            {error: "Course Id is required"}, {status: 400}
        )}

        
        const stmt = db.prepare("INSERT INTO messages (user_id, course_id, text) VALUES (?, ?, ?)")
        const result = stmt.run(session.user.id, course_id , text)

        const newMessage = db.prepare(`
                SELECT m.id, m.text, m.created_at, m.user_id, u.name AS user_name, m.course_id
                FROM messages m
                LEFT JOIN users u ON m.user_id = u.id
                WHERE m.id = ?;
            `).get(result.lastInsertRowid)

        // Broadcast new message
        broadcastMessage({type: "new", data: newMessage})

        return Response.json({
            success: true,
            message: "Message saved with success!",
            data: newMessage
        })

    } catch(e) {
        console.error("Error saving message", e)
        return Response.json(
            {error: "Failed to save message"}, {status: 500}
        )
    }
}


// Delete handler to remove a message by its author
export async function DELETE(request) {
    try {

        const session = await getServerSession(authOptions)

        if(!session?.user) {
            return Response.json({Error: "Unauthorized"}, {status:401})
        }

        const {id}= await request.json()

        if(!id) {
            return Response.json({Error: "Message Id required"}, {status:400})
        }

        const message = db.prepare("SELECT * FROM messages WHERE id = ?").get(id)

        if(!message || message.user_id !== session.user.id) {
            return Response.json({Error: "Unauthorize"}, {status:403})
        }

        db.prepare("DELETE FROM messages WHERE id = ?").run(id)

        broadcastMessage({
            type: "delete",
            data: {id}
        })

        return Response.json({success: true, message: "Message deleted successfully!"})

    } catch (e) {
        console.error("Error deleting message: ", e)
        return Response.json({Error: "Failed to delete message"}, {status:500})
    }
}