import path from "path"
import fs from "fs"

export const loadSQL = (relativePath) => fs.readFileSync(path.join(process.cwd(), "src/data/db", relativePath), "utf8")