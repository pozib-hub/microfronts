import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GlobalSettingsSchema } from '../types/globalSettings'

const initialState: GlobalSettingsSchema = {
    isLoaderPage: false
}

export const globalSettingsSlice = createSlice({
    name: 'globalSettings',
    initialState,
    reducers: {
        setLoaderPage: (state, action: PayloadAction<boolean>) => {
            state.isLoaderPage = action.payload
        },
    },
})

export const { actions: globalSettingsActions } = globalSettingsSlice
export const { reducer: globalSettingsReducer } = globalSettingsSlice