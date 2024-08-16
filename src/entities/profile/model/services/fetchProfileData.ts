import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from 'app/providers/StoreProvider'

import { IProfile } from '../types/profile'
import { profileActions } from '../slice/profileSlice'

interface IProps {
    id?: string
}

enum Errors {

}

export const fetchProfileData = createAsyncThunk<
    IProfile, IProps, ThunkConfig<string>
>(
    'profile/fetchProfileData',
    async (props = {}, thunkAPI): Promise<IProfile> => {
        const { id } = props

        const { dispatch, rejectWithValue, extra } = thunkAPI
        try {

            const response = await extra.api.get<IProfile>('profile', { params: { id } })

            if (!response.data) {
                throw new Error('error')
            }

            dispatch(profileActions.setData(response.data))

            return response.data
        } catch (error) {
            throw rejectWithValue('404')
        }
    },
)
