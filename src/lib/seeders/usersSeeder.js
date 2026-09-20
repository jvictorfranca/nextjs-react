import { loadSQL } from "../utils";
import path from "path"
import bcrypt from "bcrypt"
import fs from "fs"


const insertUsersSQL = loadSQL("seed/insertUsers.sql")
const filePath = path.join(process.cwd(), "src/data/users.json")

export default function seedUsers(db) {
 
const count = db.prepare("SELECT COUNT(*) AS count FROM users").get().count;
if (count === 0) {

    const users = JSON.parse(
                fs.readFileSync(filePath, "utf-8")
            )

    const insert = db.prepare(insertUsersSQL)

    const insertMany = db.transaction((users) => {
    for (const user of users) {
        const hashed = bcrypt.hashSync(user.password, 10)
        insert.run(
            
            user.id, user.name, user.email, hashed, user.email_verified, user.token, user.is_admin
        )
    }
})

        insertMany(users)
    }
}
