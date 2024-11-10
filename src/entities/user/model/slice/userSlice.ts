import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser, UserSchema } from '../types/user'


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
        },
        // переделать в асинк 
        initAuthData: (state) => {
            const user = localStorage.getItem('user')

            if (user) {
                state.authData = JSON.parse(user)
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
