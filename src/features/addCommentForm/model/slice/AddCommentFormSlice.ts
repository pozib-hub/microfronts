import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AddCommentFormSchema } from '../types/addCommentForm'
import builderReducersByProject from 'utils/builderReducersByProject'
import {
    addCommentForArticle

} from 'pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle'

const initialState: AddCommentFormSchema = {
    text: '',
    isLoading: false,
    error: undefined,
}

export const addCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        clearForm: () => initialState
    },
    extraReducers: (builder) => {
        builderReducersByProject(builder)?.addCase(
            addCommentForArticle.pending,
            (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(
                addCommentForArticle.fulfilled,
                (state, action) => {
                    state.isLoading = false
                    state.text = ''
                    state.error = undefined
                })
            .addCase(
                addCommentForArticle.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.error = action.payload
                })
    },
})

export const { actions: addCommentFormActions } = addCommentFormSlice
export const { reducer: addCommentFormReducer } = addCommentFormSlice
