import path from "path"
import { readFileSync } from "fs"

import { DB } from "../types"

const dbConfig = {
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // database: process.env.DB_NAME,
    path: path.resolve(__dirname, 'db.json')
}

const db = JSON.parse(readFileSync(dbConfig.path, 'utf8')) as DB

export default db
export {
    dbConfig
}