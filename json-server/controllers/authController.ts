import { NextFunction, Request, Response } from "express"

import UserService from '../services/UserService'
import ApiError from '../exceptions/ApiError'

const isPasswordEquals = (p1: string, p2: string) =>
    p1 === p2

class UserController {

    async login(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { username, password } = req.body

            const userFromBd = await UserService.get(username)

            if (!userFromBd) {
                throw ApiError.BadRequest('Мы не нашли учетную запись с таким Username')
            }

            if (!isPasswordEquals(password, userFromBd.password)) {
                throw ApiError.BadRequest('Username или Пароль не верны')
            }

            return res.json(userFromBd)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export default new UserController()
