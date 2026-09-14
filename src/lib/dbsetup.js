import Database from "better-sqlite3"
import path from "path"
import seedUsers from "./seeders/usersSeeder";
import seedMessages from "./seeders/messagesSeeder";
import seedCourses from "./seeders/courseSeeder";
import { loadSQL } from "./utils";

const dbPath = path.join(process.cwd(), "src/data/app.db")

// Initialize DB

const db = new Database(dbPath)

const createTableSql = loadSQL("schema/createTables.sql")

// Create users and messages tables if they don't exist
db.exec(createTableSql);

seedUsers(db)
seedMessages(db)
seedCourses(db)

export default db;