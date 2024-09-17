import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"
import { fetchProfileData } from "./fetchProfileData"

describe('fetchProfileData.test', () => {
    test('fetch data success', async () => {
        const data = {
            username: "admin",
            firstname: "admin",
            lastname: "admin",
            age: 99,
            address: {},
            hobbies: ["admin", "admin"],
            avatar: "admin",
        }

        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockResolvedValue(Promise.resolve({ data }))

        const result = await thunk.callThunk({ id: "1" })

        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe("fulfilled")
        expect(result.payload).toEqual(data)
    })

    test('fetch data error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockResolvedValue(Promise.resolve({ status: 403 }))

        const result = await thunk.callThunk({})

        expect(result.meta.requestStatus).toBe("rejected")
    })
})