import { IProfile } from "entities/profile"
import { updateProfileData } from "../services/updateProfileData/updateProfileData"
import { editProfileActions, editProfileReducer } from "./profileSlice"
import { EditableProfileSchema } from "../types/editableProfileCard"
import { ValidateProfileError } from '../../model/const/const'

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
        const state: PartialDeep<EditableProfileSchema> = {
            data: undefined
        }
        expect(editProfileReducer(
            state as EditableProfileSchema,
            editProfileActions.setData(validData))
        )
            .toEqual({ data: validData })
    })

    // test('test update profile', () => {
    //     const state: PartialDeep<EditableProfileSchema> = {
    //         data: validData
    //     }
    //     expect(profileReducer(
    //         state as EditableProfileSchema,
    //         profileActions.updateProfile(validData))
    //     )
    //         .toEqual(validData)
    // })

    test('test set Error', () => {
        const state: PartialDeep<EditableProfileSchema> = {
            error: undefined
        }
        expect(editProfileReducer(
            state as EditableProfileSchema,
            editProfileActions.setError("error"))
        )
            .toEqual({ error: "error" })
    })

    test('test set readonly', () => {
        const state: PartialDeep<EditableProfileSchema> = {
            readonly: false
        }
        expect(editProfileReducer(
            state as EditableProfileSchema,
            editProfileActions.setReadonly(true))
        )
            .toEqual({ readonly: true })
    })

    test('test clear Data', () => {
        const state: PartialDeep<EditableProfileSchema> = {
            data: validData,
            error: "error",
            form: validData,
            readonly: false,
            isLoading: true,
        }
        expect(editProfileReducer(
            state as EditableProfileSchema,
            editProfileActions.clearData())
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
        const state: PartialDeep<EditableProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        }
        expect(editProfileReducer(
            state as EditableProfileSchema,
            updateProfileData.pending("1", ""),
        ))
            .toEqual({
                isLoading: true,
                validateErrors: undefined,
            })
    })

    test('test update profile service fullfiled', () => {
        const state: PartialDeep<EditableProfileSchema> = {
            isLoading: true,
        }

        expect(editProfileReducer(
            state as EditableProfileSchema,
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