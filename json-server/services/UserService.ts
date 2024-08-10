import DataBase from "../core/DataBase"

const normalizeString = (string: string) => string.trim().toLowerCase()


class UserService {
    async get(username: string) {
        const { users } = DataBase

        const user = users.find((u) => u.username === normalizeString(username))
        return user
    }
}

export default new UserService()