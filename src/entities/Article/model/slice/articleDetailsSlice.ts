import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IArticle, ArticleDetailsSchema } from '../types/article'
import builderReducersByProject from 'utils/builderReducersByProject'
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById'


const initialState: ArticleDetailsSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
}

export const articleDetailsSlice = createSlice({
    name: 'article-detail',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<IArticle>) => {
            state.data = action.payload
        },
        clearData: () => initialState
    },
    extraReducers: (builder) => {
        builderReducersByProject(builder)?.addCase(
            fetchArticleById.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { actions: articleDetailsActions } = articleDetailsSlice
export const { reducer: articleDetailsReducer } = articleDetailsSlice
