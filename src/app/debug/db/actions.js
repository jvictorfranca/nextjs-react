 "use server"

import db from "@/lib/dbsetup"

 export async function getDatabaseContents() {
    try {
        const tables = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`)
            .all()
        const results = {}

        for (let t of tables) {
            const rows = db.prepare(`SELECT * FROM ${t.name}`).all()

            results[t.name] = rows
        }
        return results

    } catch (e) {
        console.error("DB debug error: ", e)
        throw new Error("Failed to fetch database info")
    }
 }