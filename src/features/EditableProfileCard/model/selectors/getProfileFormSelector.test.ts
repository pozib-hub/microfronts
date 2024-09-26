import { StateSchema } from "app/providers/StoreProvider"
import Avatar from 'src/shared/assets/tests/Avatar.jpg'
import { IProfile } from "entities/profile"
import { getProfileFormSelector } from "./getProfileFormSelector"

describe("getProfileForm.test", () => {
    test("", () => {
        const form: IProfile = {
            username: 'John Doe',
            firstname: 'John',
            lastname: "Doe",
            // avatar: Avatar,
        }
        const state: PartialDeep<StateSchema> = {
            editProfile: {
                form: form
            }
        }

        expect(getProfileFormSelector(state as StateSchema))
            .toEqual(form)
    })

    test("", () => {
        const state: PartialDeep<StateSchema> = {}

        expect(getProfileFormSelector(state as StateSchema))
            .toEqual(undefined)
    })
})