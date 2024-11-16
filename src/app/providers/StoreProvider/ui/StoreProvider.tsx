import { ReactNode } from 'react'
import { Provider } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { ReducersMapObject } from '@reduxjs/toolkit'

import { createReduxStore } from '../config/store'
import { StateSchema } from '../config/StateSchema'
import { $api } from '@shared/api/api'
import { userActions } from '@entities/user'

interface StoreProviderProps {
    children?: ReactNode
    initialState?: PartialDeep<StateSchema>
    asyncReducers?: PartialDeep<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props

    // const navigate = useNavigate()

    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        // navigate
    )

    const UNAUTHORIZED = 401
    $api.interceptors.response.use(
        (response) => response,
        (error) => {
            const { status } = error.response
            if (status === UNAUTHORIZED) {
                store.dispatch(userActions.logout())
            }
            return Promise.reject(error)
        },
    )

    return <Provider store={store}>{children}</Provider>
}
