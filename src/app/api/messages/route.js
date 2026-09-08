import path from "path"
import {promises as fs} from "fs"

// GET Handler. Next JS correctly maps to the API using the function name to the HTTP verb.

const filePath = path.join(process.cwd(), "src/data/messages.json")
export async function GET () {

    try{
        const data = await fs.readFile(filePath, "utf8")
        const messages = JSON.parse(data)
        return Response.json(messages)
    } catch (e) {

        console.error("Error reading messages", e)

        return Response.json({error: "Failed to  read messages"}, {status: 500})

    }
}

export async function POST (request) {

    try{
        const newMessage = await request.json()
        const data = await fs.readFile(filePath, "utf-8")
        const messages = JSON.parse(data)


        const messageWithId = {
            id: messages.length ? messages[messages.length - 1].id + 1 : 1,
            text: newMessage.text
        }

        messages.push(messageWithId)

        await fs.writeFile(filePath, JSON.stringify(messages, null, 2))

        return Response.json({
            success: true,
            message: "Message saved with success!",
            data: messageWithId
        })

    } catch(e) {
        console.error("Error saving message", e)
    }
}