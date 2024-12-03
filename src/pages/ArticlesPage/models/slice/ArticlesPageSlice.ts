import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StateSchema } from '@app/providers/StoreProvider'
import builderReducersByProject from '@utils/builderReducersByProject'
import BrowserStorage from '@utils/BrowserStorage'
import { ArticleType, IArticle } from '@entities/Article'
import { OrderType } from '@shared/types/sort'
import { ArticleFilters, ArticleSortField } from '@entities/Article'
import { ArticleView } from '@entities/Article'

import { ArticlesPageSchema } from '../types/articlesPage'
import { fetchArticlesList } from '../service/fetchArticlesList/fetchArticlesList'
import { getLimitByView, getView } from '../helpers'

const articlesAdapter = createEntityAdapter({
    selectId: (article: IArticle) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
)

const getStateBySearchParams = () => {
    const urlParams = new URLSearchParams(window.location.search)

    const defaultFilters: ArticleFilters = {
        type: [],
    }

    let filters: ArticleFilters = defaultFilters
    try {
        filters = JSON.parse(urlParams.get('filters') || '')
    } catch {
        console.log('error parsing getStateBySearchParams')
    }

    return {
        sort: (urlParams.get('sort') as ArticleSortField.CREATED_AT) || ArticleSortField.CREATED_AT,
        order: (urlParams.get('order') || 'desc') as OrderType,
        page: 1,
        // limit: Number(urlParams.get('limit') || 15),
        search: urlParams.get('search') || '',
        type: (urlParams.get('view') as ArticleType) || ArticleType.DEVELOPMENT,
        filters: filters,
    }
}

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: true,
        error: undefined,
        limit: getLimitByView(),
        hasMore: true,
        totalCount: 0,
        view: getView(),
        ids: [],
        entities: {},
        _inited: true,
        ...getStateBySearchParams(),
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload
            BrowserStorage.set('articles-view', action.payload)
        },
        addArticle: (state, action: PayloadAction<IArticle>) => {
            articlesAdapter.upsertOne(state, action.payload)
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setLimit: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload
            BrowserStorage.set('articles-view', action.payload)
        },
        setOrder: (state, action: PayloadAction<OrderType>) => {
            state.page = 1
            state.order = action.payload
            BrowserStorage.set('articles-order', action.payload)
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.page = 1
            state.sort = action.payload
            BrowserStorage.set('articles-sort', action.payload)
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.page = 1
            state.search = action.payload
        },
        setFilters: (state, action: PayloadAction<ArticleFilters>) => {
            state.filters = action.payload
        },
        setTypes: (state, action: PayloadAction<ArticleType[]>) => {
            if (state.filters) {
                state.filters.type = action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builderReducersByProject(builder)
            ?.addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined
                state.isLoading = true

                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state)
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false
                state.hasMore = action.payload.length >= (state.limit || 0)

                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload)
                } else {
                    articlesAdapter.addMany(state, action.payload)
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { reducer: articlesPageReducer } = articlesPageSlice
export const { actions: articlesPageActions } = articlesPageSlice
