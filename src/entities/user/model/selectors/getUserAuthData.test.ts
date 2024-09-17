import { StateSchema } from "app/providers/StoreProvider"
import { IUser, UserSchema } from "../types/user"
import { getUserAuthData } from "./getUserAuthData"

describe("getUserAuthData.test", () => {
    test("", () => {

        const user: UserSchema = {
            authData: {
                id: "1",
                username: "admin"
            }
            // avatar: Avatar,
        }
        const state: PartialDeep<StateSchema> = {
            user: user
        }

        expect(getUserAuthData(state as StateSchema))
            .toEqual(user.authData)
    })

    test("", () => {
        const state: PartialDeep<StateSchema> = {
            user: {}
        }

        expect(getUserAuthData(state as StateSchema))
            .toEqual(undefined)
    })
})