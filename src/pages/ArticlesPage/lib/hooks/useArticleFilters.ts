import { useCallback } from 'react'

import { OrderType } from '@shared/types/sort'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { ArticleSortField, ArticleType } from '@entities/Article'
import { useDebounce } from '@shared/lib/hooks/useDebounce'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { ArticleView } from '@entities/Article'

// TODO rename models to model
import { articlesPageActions } from '../../models/slice/ArticlesPageSlice'
import { fetchArticlesList } from '../../models/service/fetchArticlesList/fetchArticlesList'

export function useArticleFilters() {
    const view = useAppSelector((state) => state.articlesPage?.view) || 'list'
    const sort = useAppSelector((state) => state.articlesPage?.sort) || ArticleSortField.ID
    const order = useAppSelector((state) => state.articlesPage?.order) || 'asc'
    const search = useAppSelector((state) => state.articlesPage?.search) || ''
    const types = useAppSelector((state) => state.articlesPage?.filters?.type) || []

    const dispatch = useAppDispatch()

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }))
    }, [dispatch])

    const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view))
        },
        [dispatch],
    )

    const onChangeSort = useCallback(
        (newSort: ArticleSortField) => {
            dispatch(articlesPageActions.setSort(newSort))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )

    const onChangeOrder = useCallback(
        (newOrder: OrderType) => {
            dispatch(articlesPageActions.setOrder(newOrder))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(articlesPageActions.setSearch(search))
            dispatch(articlesPageActions.setPage(1))
            debouncedFetchData()
        },
        [dispatch, debouncedFetchData],
    )

    const onChangeTypes = useCallback(
        (value: ArticleType[]) => {
            dispatch(articlesPageActions.setTypes(value))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )

    return {
        view,
        sort,
        order,
        search,
        types,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeTypes,
    }
}
