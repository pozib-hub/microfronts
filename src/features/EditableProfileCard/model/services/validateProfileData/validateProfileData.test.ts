import { IProfile } from "@entities/profile"
import { validateProfileData } from "./validateProfileData"
import { ValidateProfileError } from '../../../model/const/const'

describe("validateProfileData", () => {
    test("ok", () => {
        const data: IProfile = {
            firstname: "John",
            lastname: "Doe",
            age: 30,
            hobbies: ["reading", "coding"],
            avatar: "https://example.com/avatar.jpg",
            address: {
                street: "123 Main St",
                city: "New York",
                zip: "12345",
            },
        }

        const result = validateProfileData(data)

        expect(result).toEqual([])
    })

    test("errors", () => {
        const data: IProfile = {
            // firstname: "John",
            // lastname: "Doe",
            // age: 30,
            hobbies: ["reading", "coding"],
            avatar: "https://example.com/avatar.jpg",
            address: {
                street: "123 Main St",
                city: "New York",
                zip: "12345",
            },
        }

        const result = validateProfileData(data)

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE
        ])
    })
})