import {
    createEntityAdapter,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit'

import { StateSchema } from '@app/providers/StoreProvider'

import builderReducersByProject from '@utils/builderReducersByProject'
import { IArticle } from '@entities/Article'
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema'
import {
    fetchArticleRecommendations
} from '../services/fetchArticleRecommendations/fetchArticleRecommendations'

const recommendationsAdapter = createEntityAdapter({
    selectId: (article: IArticle) => article.id,
})

export const getRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations
        || recommendationsAdapter.getInitialState(),
)

const articleDetailsRecommendationsSlice = createSlice({
    name: 'articleDetailsRecommendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builderReducersByProject(builder)?.addCase(fetchArticleRecommendations.pending, (state) => {
            state.error = undefined
            state.isLoading = true
        })
            .addCase(fetchArticleRecommendations.fulfilled, (
                state,
                action: PayloadAction<IArticle[]>,
            ) => {
                state.isLoading = false
                recommendationsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { reducer: articleDetailsRecommendationsReducer } = articleDetailsRecommendationsSlice
