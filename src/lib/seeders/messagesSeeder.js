import fs from "fs"
import path from "path"
import { loadSQL } from "../utils"

const filePath = path.join(process.cwd(), "src/data/messages.json")
const insertMessagesSQL = loadSQL("seed/insertMessages.sql")

export default function seedMessages(db) {

    const { count } = db
        .prepare("SELECT COUNT(*) as count FROM messages")
        .get()
    
    if (count === 0) {
        const messages = JSON.parse(
            fs.readFileSync(filePath, "utf-8")
        )
    
        const insert = db.prepare(insertMessagesSQL)
    
        const insertMany = db.transaction((messages) => {
            for (const message of messages) {
                insert.run(
                    message.id,
                    message.user_id,
                    message.course_id,
                    message.text
                )
            }
        })
    
        insertMany(messages)
    }
}
