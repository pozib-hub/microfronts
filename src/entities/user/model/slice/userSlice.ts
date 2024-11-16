import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setFeaturesFlags } from '@shared/lib/features'
import { USER_LOCALSTORAGE_KEY } from '@shared/const/localstorage'
import builderReducersByProject from '@utils/builderReducersByProject'

import { IUser, UserSchema } from '../types/user'
import { me } from '../services/me'


const initialState: UserSchema = {
    authData: undefined,
    isLoading: true,
    error: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload
            setFeaturesFlags(action.payload.features)

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.authData = undefined
            state.isLoading = false
            state.error = undefined
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        },
    },
    extraReducers: (builder) => {
        builderReducersByProject(builder)
            ?.addCase(
                me.pending,
                (state) => {
                    state.error = undefined
                    state.isLoading = true
                }
            )
            .addCase(
                me.fulfilled,
                (state, action) => {
                    state.error = undefined
                    state.isLoading = false
                    state.authData = action.payload.data
                }
            )
            .addCase(
                me.rejected,
                (state, action) => {
                    state.error = "401"
                    state.isLoading = false
                    state.authData = undefined
                }
            )
    }

})

export const { actions: userActions } = userSlice
// export const { reducer: userReducer } = userSlice
export const userReducer = userSlice.reducer
