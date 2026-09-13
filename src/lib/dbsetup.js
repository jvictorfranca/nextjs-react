import Database from "better-sqlite3"
import path from "path"
import seedUsers from "./seeders/usersSeeder";
import seedMessages from "./seeders/messagesSeeder";
import seedCourses from "./seeders/courseSeeder";

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

CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subTitle TEXT,
    description TEXT,
    course_slug TEXT UNIQUE,
    original_price TEXT,
    courseRating TEXT,
    numberOfStudents TEXT,
    duration TEXT,
    language TEXT,
    big_image TEXT,
    is_paid BOOLEAN DEFAULT 1,
    isBestseller BOOLEAN DEFAULT 0,
    thingsToLearn TEXT,
    courseCurriculum TEXT
);
`);

seedUsers(db)
seedMessages(db)
seedCourses(db)

export default db;