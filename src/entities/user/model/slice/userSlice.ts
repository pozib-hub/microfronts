import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser, UserSchema } from '../types/user'
import { setFeaturesFlags } from '@shared/lib/features'


const initialState: UserSchema = {
    authData: undefined,
    _inited: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload
            state.authData.roles = action.payload.roles
            setFeaturesFlags(action.payload.features)
        },
        // переделать в асинк 
        initAuthData: (state) => {
            const string_user = localStorage.getItem('user')

            if (string_user) {
                const user = JSON.parse(string_user) as IUser
                state.authData = user
                setFeaturesFlags(user.features)
            }

            state._inited = true
        },
        logout: (state) => {
            state.authData = undefined
            localStorage.removeItem('user')
        },
    },

})

export const { actions: userActions } = userSlice
// export const { reducer: userReducer } = userSlice
export const userReducer = userSlice.reducer
