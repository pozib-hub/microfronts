import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { IProfile } from '../types/profile'
import { getProfileFormSelector } from '../selectors'

export const updateProfileData = createAsyncThunk<
    IProfile,
    void,
    ThunkConfig<string>
>(
    'profile/updateProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi

        const formData = getProfileFormSelector(getState())

        try {
            const response = await extra.api.put<IProfile>('/profile', { form: formData })

            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue('error')
        }
    },
)
