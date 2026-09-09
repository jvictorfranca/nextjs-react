import Database from "better-sqlite3"
import path from "path"
import seedUsers from "./seeders/usersSeeder";
import seedMessages from "./seeders/messagesSeeder";

const dbPath = path.join(process.cwd(), "src/data/app.db")

// Initialize DB

const db = new Database(dbPath)

// Create users and messages tables if they don't exist
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`);

seedUsers(db)
seedMessages(db)

export default db;