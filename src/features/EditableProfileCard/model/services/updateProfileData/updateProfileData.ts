import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/providers/StoreProvider'
import { IProfile } from '@entities/profile'
import { getProfileFormSelector } from '../../selectors'
import { validateProfileData } from '../validateProfileData/validateProfileData'
import { ValidateProfileError } from '../../../model/const/const'

const prepareProfileData = (profile?: IProfile) => {
    if (!profile) {
        return
    }

    const newProfile = { ...profile }

    if (newProfile.age) {
        newProfile.age = Number(newProfile.age)
    }

    return newProfile
}

export const updateProfileData = createAsyncThunk<
    IProfile,
    string,
    ThunkConfig<ValidateProfileError[]>
>(
    'profile/updateProfileData',
    async (id, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi

        let formData = getProfileFormSelector(getState())

        formData = prepareProfileData(formData)
        const errors = validateProfileData(formData)

        if (errors.length) {
            return rejectWithValue(errors)
        }

        try {
            const response = await extra.api.put<IProfile>('/profile/' + id, { form: formData })

            if (!response.data) {
                throw new Error('error')
            }

            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue([ValidateProfileError.SERVER_ERROR])
        }
    },
)
