import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { API_Errors } from 'shared/api/types'
import builderReducersByProject from 'utils/builderReducersByProject'
import { IProfile } from 'entities/profile'

import { EditableProfileSchema, ValidateProfileError } from '../types/editableProfileCard'

const initialState: EditableProfileSchema = {
    data: undefined,
    readonly: true,
    isLoading: false,
    error: undefined,
    validateErrors: undefined,
    form: undefined,
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
            state.validateErrors = undefined
            state.error = undefined
        },
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload || ""
        },
        setValidateErrors: (state, action: PayloadAction<ValidateProfileError[] | undefined>) => {
            state.validateErrors = action.payload
        },
        updateProfile: (state, action: PayloadAction<IProfile>) => {
            // state.data = action.payload
            state.form = {
                ...state.form,
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
        builderReducersByProject(builder)?.addCase(
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


        builder.addCase(updateProfileData.pending, (state) => {
            state.validateErrors = undefined
            state.error = undefined
            state.isLoading = true
        })
            .addCase(updateProfileData.fulfilled, (
                state,
                action: PayloadAction<IProfile>,
            ) => {
                state.data = action.payload
                state.form = action.payload
                state.isLoading = false
                state.readonly = true
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false
                state.validateErrors = action.payload
            })
    },
})

export const { actions: editProfileActions } = profileSlice
export const { reducer: editProfileReducer } = profileSlice
export const { selectors: editProfileSelectors } = profileSlice