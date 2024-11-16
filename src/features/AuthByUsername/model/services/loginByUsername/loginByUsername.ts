import { AxiosInstance } from 'axios'
import { createAsyncThunk, } from '@reduxjs/toolkit'

import { ThunkConfig } from '@app/providers/StoreProvider'
import { IUser, userActions } from '@entities/user'
import { USER_LOCALSTORAGE_KEY } from '@shared/const/localstorage'
import BrowserStorage from '@utils/BrowserStorage'

interface IProps {
    username: string
    password: string
}

enum LoginErrors {
    WRONG_LOGIN_PASSWORD = 'WRONG_LOGIN_PASSWORD',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    SERVER_ERROR = 'SERVER_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export const loginByUsername = createAsyncThunk<
    IUser,
    IProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async (authData, thunkAPI): Promise<IUser> => {
        const { dispatch, rejectWithValue, extra } = thunkAPI
        try {

            const response = await extra.api.post<IUser>('login', authData)

            if (!response.data) {
                throw new Error('error')
            }

            dispatch(userActions.setAuthData(response.data))

            return response.data
        } catch (error) {
            throw rejectWithValue('auth.wrongLoginPassword')
        }
    },
)
