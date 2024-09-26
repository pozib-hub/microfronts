import { ReducersMapObject } from '@reduxjs/toolkit'
import { StoryFn } from '@storybook/react'

import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice'
import { addCommentFormReducer } from 'features/addCommentForm/model/slice/AddCommentFormSlice'
import { loginReducer } from 'features/AuthByUsername'
import { editProfileReducer } from 'features/EditableProfileCard/model/slice/profileSlice'
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices'
import { ReducersList } from 'shared/components/DynamicModuleLoader/DynamicModuleLoader'

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
