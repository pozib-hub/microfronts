import { ReducersMapObject } from '@reduxjs/toolkit'
import { StoryFn } from '@storybook/react'

import { StateSchema, StoreProvider } from '@app/providers/StoreProvider'
import { articleDetailsReducer } from '@entities/Article/testing'
import { addCommentFormReducer } from '@features/addCommentForm/testing'
import { loginReducer } from '@features/AuthByUsername/testing'
import { editProfileReducer } from '@features/EditableProfileCard/testing'
import { articleDetailsPageReducer } from '@pages/ArticleDetailsPage/testing'
import { ReducersList } from '@shared/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    editProfile: editProfileReducer,
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
