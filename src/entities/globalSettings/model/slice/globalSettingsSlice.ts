import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GlobalSettingsSchema } from '../types/globalSettings'

const initialState: GlobalSettingsSchema = {
    isLoaderPage: false,
    scrollPageRestore: {},
}

export const globalSettingsSlice = createSlice({
    name: 'globalSettings',
    initialState,
    reducers: {
        setLoaderPage: (state, action: PayloadAction<boolean>) => {
            state.isLoaderPage = action.payload
        },
        setScrollPageRestore: (state, action: PayloadAction<{ [key: string]: number }>) => {
            state.scrollPageRestore = action.payload
        },
    },
})

export const { actions: globalSettingsActions } = globalSettingsSlice
export const { reducer: globalSettingsReducer } = globalSettingsSlice