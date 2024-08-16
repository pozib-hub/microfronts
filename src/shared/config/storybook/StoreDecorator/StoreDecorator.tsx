import { ReducersMapObject } from '@reduxjs/toolkit'
import { StoryFn } from '@storybook/react'

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'

const defaultReducers: PartialDeep<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
}

export const StoreDecorator = (
    state: PartialDeep<StateSchema>,
    asyncReducers?: PartialDeep<ReducersMapObject<StateSchema>>,
) => function cb(Story: StoryFn) {
    return <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultReducers, ...asyncReducers }}
    >
        <Story />
    </StoreProvider>
}
