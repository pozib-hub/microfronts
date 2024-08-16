import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProfile, ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../services/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData'

const initialState: ProfileSchema = {
    data: undefined,
    readonly: true,
    isLoading: false,
    error: undefined,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<IProfile>) => {
            state.data = action.payload
        },
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload
        },
        cancelEdit: (state) => {
            state.readonly = true
            state.form = state.data
        },
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload || ""
        },
        updateProfile: (state, action: PayloadAction<IProfile>) => {
            // state.data = action.payload
            state.form = {
                ...state.data,
                ...action.payload
            }
        },
        clearData: () => initialState,
    },
    selectors: {
        getLoadingSelector: (state, action) => state.isLoading,
        // getProfileForm: (state) => state.form
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchProfileData.pending,
            (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<IProfile>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                })
            .addCase(
                fetchProfileData.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.error = action.payload
                })
            .addCase(updateProfileData.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(updateProfileData.fulfilled, (
                state,
                action: PayloadAction<IProfile>,
            ) => {
                state.isLoading = false
                state.data = action.payload
                state.form = action.payload
                state.readonly = true
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
export const { selectors: profileSelectors } = profileSlice