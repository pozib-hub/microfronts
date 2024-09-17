import { updateProfileData } from "../services/updateProfileData/updateProfileData"
import { IProfile, ProfileSchema, ValidateProfileError } from "../types/profile"
import { profileActions, profileReducer } from "./profileSlice"

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
}

describe('profileSlice.test', () => {

    test('test set data', () => {
        const state: PartialDeep<ProfileSchema> = {
            data: undefined
        }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setData(validData))
        )
            .toEqual({ data: validData })
    })

    // test('test update profile', () => {
    //     const state: PartialDeep<ProfileSchema> = {
    //         data: validData
    //     }
    //     expect(profileReducer(
    //         state as ProfileSchema,
    //         profileActions.updateProfile(validData))
    //     )
    //         .toEqual(validData)
    // })

    test('test set Error', () => {
        const state: PartialDeep<ProfileSchema> = {
            error: undefined
        }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setError("error"))
        )
            .toEqual({ error: "error" })
    })

    test('test set readonly', () => {
        const state: PartialDeep<ProfileSchema> = {
            readonly: false
        }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true))
        )
            .toEqual({ readonly: true })
    })

    test('test clear Data', () => {
        const state: PartialDeep<ProfileSchema> = {
            data: validData,
            error: "error",
            form: validData,
            readonly: false,
            isLoading: true,
        }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.clearData())
        )
            .toEqual({
                data: undefined,
                error: undefined,
                form: undefined,
                readonly: true,
                isLoading: false,
            })
    })

    // text extra reducer
    test('test update profile service pending', () => {
        const state: PartialDeep<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        }
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending("1", ""),
        ))
            .toEqual({
                isLoading: true,
                validateErrors: undefined,
            })
    })

    test('test update profile service fullfiled', () => {
        const state: PartialDeep<ProfileSchema> = {
            isLoading: true,
        }

        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(validData, '1', ''),
        )).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            validateError: undefined,
            form: validData,
            data: validData,
        })
    })
})