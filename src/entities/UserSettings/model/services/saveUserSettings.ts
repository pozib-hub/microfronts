import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@app/providers/StoreProvider'
import parseApiErrors from '@shared/api/parseApiErrors'
import { API_Errors } from '@shared/api/types'

import { IUserSettings } from '../types/userSettings'
import { setUserSettingMutation } from '../../api/userSettingsApi'

type IProps = {
    [K in keyof IUserSettings]: { key: K; value: NonNullable<IUserSettings[K]> }
}[keyof IUserSettings]

export const saveUserSetting = createAsyncThunk<
    IProps,
    IProps,
    ThunkConfig<API_Errors | string>
>(
    'userSettings/save',
    async (props, thunkAPI): Promise<IProps> => {
        const { dispatch, rejectWithValue, extra } = thunkAPI

        try {
            const response = await dispatch(setUserSettingMutation({ ...props })).unwrap()

            return response
        } catch (error) {
            throw rejectWithValue(parseApiErrors(error))
        }
    },
)
