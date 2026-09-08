import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "src/data/messages.json")

export default function seedMessages(db) {

    const { count } = db
        .prepare("SELECT COUNT(*) as count FROM messages")
        .get()
    
    if (count === 0) {
        const messages = JSON.parse(
            fs.readFileSync(filePath, "utf-8")
        )
    
        const insert = db.prepare(`
            INSERT INTO messages (id, text)
            VALUES (?, ?)
        `)
    
        const insertMany = db.transaction((messages) => {
            for (const message of messages) {
                insert.run(message.id, message.text)
            }
        })
    
        insertMany(messages)
    }
}

