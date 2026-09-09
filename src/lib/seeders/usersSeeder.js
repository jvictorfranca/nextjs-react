export default function seedUsers(db) {
 
const count = db.prepare("SELECT COUNT(*) AS count FROM users").get().count;
if (count === 0) {
    const insert = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)")
    insert.run("Alice", "alice@example.com")
    insert.run("bob", "bob@example.com")
}
}

