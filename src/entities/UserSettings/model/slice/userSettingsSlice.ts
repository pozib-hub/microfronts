import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import builderReducersByProject from '@utils/builderReducersByProject'
import { Theme } from '@shared/const/them'

import { IUserSettings } from '../types/userSettings'
import { saveUserSetting } from '../services/saveUserSettings'
import { getUserSetting } from '../services/getUserSettings'

const initialState: IUserSettings = {
    isFirstVisit: false,
    theme: Theme.DARK,
}

type IProps = {
    [K in keyof IUserSettings]: { key: K; value: NonNullable<IUserSettings[K]> }
}[keyof IUserSettings]


export const userSettingsSlice = createSlice({
    name: 'userSettings',
    initialState,
    reducers: {
        // setData: (state, action: PayloadAction<IUserSettings>) => {
        //     state = { ...state, ...action.payload }
        // },
        // clearData: () => initialState
    },
    extraReducers: (builder) => {
        builderReducersByProject(builder)?.addCase(
            saveUserSetting.fulfilled, (state, action: PayloadAction<IProps>) => {
                const { key, value } = action.payload
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state[key] = value
            })
            .addCase(getUserSetting.fulfilled, (state, action) => {
                const { key, value } = action.payload
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state[key] = value
            })
    }
})

export const { actions: userSettingsActions } = userSettingsSlice
export const { reducer: userSettingsReducer } = userSettingsSlice