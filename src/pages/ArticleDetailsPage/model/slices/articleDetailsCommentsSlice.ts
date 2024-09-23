import {
    createEntityAdapter,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit'

import { IComment } from 'entities/Comment'
import { StateSchema } from 'app/providers/StoreProvider'
import {
    fetchCommentsByArticleId,
} from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema'
import builderReducersByProject from 'utils/builderReducersByProject'

const commentsAdapter = createEntityAdapter({
    selectId: (comment: IComment) => comment.id,
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
)

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builderReducersByProject(builder)?.addCase(fetchCommentsByArticleId.pending, (state) => {
            state.error = undefined
            state.isLoading = true
        })
            .addCase(fetchCommentsByArticleId.fulfilled, (
                state,
                action: PayloadAction<IComment[]>,
            ) => {
                state.isLoading = false
                commentsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice
