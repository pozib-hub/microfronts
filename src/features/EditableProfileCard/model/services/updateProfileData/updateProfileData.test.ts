import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"
import { updateProfileData } from "./updateProfileData"
import { IProfile } from "entities/profile"
import { ValidateProfileError } from "../../types/editableProfileCard"

describe('updateProfileData.test', () => {
    const validData: IProfile = {
        username: "admin",
        firstname: "admin",
        lastname: "admin",
        age: 99,
        address: {
            city: "City"
        },
        hobbies: ["admin", "admin"],
        avatar: "admin",
        id: "1",
    }

    test('update data success', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData,
            {
                editProfile: {
                    form: validData
                }
            })
        thunk.api.put.mockResolvedValue(Promise.resolve({ data: validData }))

        const result = await thunk.callThunk("1")

        expect(thunk.api.put).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe("fulfilled")
        expect(result.payload).toEqual(validData)
    })

    test('update data validation errors', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData,
            {
                editProfile: {
                    form: { ...validData, address: undefined }
                }
            }
        )
        thunk.api.put.mockResolvedValue(Promise.resolve({ status: 403 }))

        const result = await thunk.callThunk("1")

        expect(result.meta.requestStatus).toBe("rejected")
        expect(result.payload).toEqual([ValidateProfileError.INCORRECT_CITY])
    })

    test('fetch data server error', async () => {
        const thunk = new TestAsyncThunk(
            updateProfileData,
            {
                editProfile: {
                    form: validData
                }
            }
        )
        thunk.api.put.mockResolvedValue(Promise.resolve({ status: 403 }))

        const result = await thunk.callThunk("1")

        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
        expect(result.meta.requestStatus).toBe("rejected")
    })
})
