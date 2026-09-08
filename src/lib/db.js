import Database from "better-sqlite3"
import path from "path"
import fs from "fs"
import seedMessages from "./seeders/messages"

const dbPath = path.join(process.cwd(), "src/data/messages.db")
const db = new Database(dbPath)

db.prepare(
    `
        CREATE TABLE IF NOT EXISTS messages
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `
).run()

seedMessages(db)

export default db;