import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@app/providers/StoreProvider'
import parseApiErrors from '@shared/api/parseApiErrors'
import { API_Errors } from '@shared/api/types'
import { IProfile } from '@entities/profile'

interface IProps {
    id?: string
}

export const fetchProfileData = createAsyncThunk<
    IProfile,
    IProps,
    ThunkConfig<API_Errors | string>
>('profile/fetchProfileData', async (props = {}, thunkAPI): Promise<IProfile> => {
    const { id } = props
    const { dispatch, rejectWithValue, extra } = thunkAPI

    try {
        const { data: profile } = await extra.api.get<IProfile>('profile', {
            params: { id },
        })

        if (!profile) {
            throw new Error('error')
        }

        return profile
    } catch (error) {
        throw rejectWithValue(parseApiErrors(error))
    }
})
