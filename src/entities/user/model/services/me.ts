import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@app/providers/StoreProvider'
import parseApiErrors from '@shared/api/parseApiErrors'
import { API_Errors } from '@shared/api/types'

import { IUser } from '../types/user'

type IReturn = {
    data: IUser
}

export const me = createAsyncThunk<
    IReturn,
    void,
    ThunkConfig<API_Errors | string>
>(
    'user/initAuth',
    async (props, thunkAPI): Promise<IReturn> => {
        const { dispatch, rejectWithValue, extra } = thunkAPI

        try {
            const response = await extra.api.get<IUser>('users/me')

            if (!response) {
                throw new Error('error')
            }

            return response
        } catch (error) {
            throw rejectWithValue(parseApiErrors(error))
        }
    },
)
