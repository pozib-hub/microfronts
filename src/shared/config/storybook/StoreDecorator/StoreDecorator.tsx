import { ReducersMapObject } from '@reduxjs/toolkit'
import { StoryFn } from '@storybook/react'

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetalsSlice'
import { profileReducer } from 'entities/profile'
import { addCommentFormReducer } from 'features/addCommentForm/model/slice/AddCommentFormSlice'
import { loginReducer } from 'features/AuthByUsername'
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices'
import { ReducersList } from 'shared/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer
}

export const StoreDecorator = (
    state: PartialDeep<StateSchema>,
    asyncReducers?: PartialDeep<ReducersMapObject<StateSchema>>,
) => function cb(Story: StoryFn) {
    return <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
        <Story />
    </StoreProvider>
}
