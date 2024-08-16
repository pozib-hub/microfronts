import path from "path"
import fs from "fs"

import { DB } from "./types"

const dbConfig = {
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // database: process.env.DB_NAME,
    path: path.resolve(__dirname, 'db.json')
}

class dataBase {
    private async readAll() {
        const json = await fs.promises.readFile(dbConfig.path, 'utf8')
        return JSON.parse(json) as DB
    }
    private async writeAll(schema: DB) {
        const json = JSON.stringify(schema, null, 4)
        await fs.promises.writeFile(dbConfig.path, json, 'utf8')
    }

    async read<K extends keyof DB>(entity: K): Promise<DB[K]> {
        try {
            const db = await this.readAll()
            return db[entity]
        } catch (error) {
            console.log(error)
            throw new Error("DB ERROR")
        }
    }

    async write<K extends keyof DB>(entity: K, value: DB[K]) {
        try {
            const db = await this.readAll()

            db[entity] = value

            await this.writeAll(db)
        } catch (error) {
            console.log(error)
            throw new Error("DB ERROR")
        }
    }
}


export default new dataBase
export {
    dbConfig
}