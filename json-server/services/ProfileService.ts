import { IProfile } from "../core/types"
import DataBase from "../core/DataBase"

class ProfileService {
    async get(id?: string) {
        const profile = await DataBase.read("profile")
        return profile
    }

    async update(profile: IProfile) {
        const currProfile = await DataBase.read("profile")

        await DataBase.write("profile", { ...currProfile, ...profile })

        return await DataBase.read("profile")
    }
}

export default new ProfileService()