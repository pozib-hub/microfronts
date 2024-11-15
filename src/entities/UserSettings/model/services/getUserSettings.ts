import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@app/providers/StoreProvider'
import parseApiErrors from '@shared/api/parseApiErrors'
import { API_Errors } from '@shared/api/types'

import { IUserSettings } from '../types/userSettings'
import { getUserSettingQuery } from '../../api/userSettingsApi'

type IProps = {
    key: keyof IUserSettings
}

type IReturn = {
    key: keyof IUserSettings,
    value: IUserSettings[keyof IUserSettings],
}

export const getUserSetting = createAsyncThunk<
    IReturn,
    IProps,
    ThunkConfig<API_Errors | string>
>(
    'userSettings/get',
    async (props, thunkAPI): Promise<IReturn> => {
        const { dispatch, rejectWithValue, extra } = thunkAPI

        try {
            const response = await dispatch(getUserSettingQuery({ ...props })).unwrap()

            if (!response) {
                throw new Error('error')
            }

            return response
        } catch (error) {
            throw rejectWithValue(parseApiErrors(error))
        }
    },
)
