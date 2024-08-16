import { NextFunction, Request, Response } from "express"

import ProfileService from '../services/ProfileService'
import { IProfile } from "../core/types"
import ApiError from '../exceptions/ApiError'

class ProfileController {
    async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const { id } = req.params

        try {
            const profile = await ProfileService.get(id)

            return res.json(profile)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }

    async update(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const form: IProfile = req.body.form
            const newProfile = await ProfileService.update(form)

            return res.json(newProfile)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

export default new ProfileController()
