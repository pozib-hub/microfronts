import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import builderReducersByProject from '@utils/builderReducersByProject'
import { Theme } from '@shared/const/theme'
import { KEY_THEME_BROWSER_STORAGE } from '@shared/const/localstorage'

import { IUserSettings } from '../types/userSettings'
import { saveUserSetting } from '../services/saveUserSettings'
import { getUserSetting } from '../services/getUserSettings'

const initialState: IUserSettings = {
    isFirstVisit: false,
    theme: (localStorage.getItem(KEY_THEME_BROWSER_STORAGE) as Theme) || Theme.DARK,
}

type IProps = {
    [K in keyof IUserSettings]: { key: K; value: NonNullable<IUserSettings[K]> }
}[keyof IUserSettings]

export const userSettingsSlice = createSlice({
    name: 'userSettings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builderReducersByProject(builder)
            ?.addCase(saveUserSetting.fulfilled, (state, action: PayloadAction<IProps>) => {
                const { key, value } = action.payload
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state[key] = value

                if (key === 'theme') {
                    localStorage.setItem(KEY_THEME_BROWSER_STORAGE, value)
                }
            })
            .addCase(getUserSetting.fulfilled, (state, action) => {
                const { key, value } = action.payload
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state[key] = value

                if (key === 'theme') {
                    state[key] = value || Theme.DARK
                    localStorage.setItem(KEY_THEME_BROWSER_STORAGE, value || Theme.DARK)
                }
            })
    },
})

export const { actions: userSettingsActions } = userSettingsSlice
export const { reducer: userSettingsReducer } = userSettingsSlice
