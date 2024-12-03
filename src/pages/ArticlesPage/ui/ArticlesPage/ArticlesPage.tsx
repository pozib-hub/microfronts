import { memo, useCallback, useEffect } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@shared/components/DynamicModuleLoader/DynamicModuleLoader'
import { StickyLayout } from '@shared/layouts/StickyLayout'
import { useDebounce } from '@shared/lib/hooks/useDebounce'
import { ArticleList } from '@entities/Article'
import { ScrollActionsLayout } from '@widgets/ScrollActionsLayout'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'

import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer'
import { FiltersContainer } from '../FiltersContainer/FiltersContainer'
import { articlesPageReducer, getArticles } from '../../models/slice/ArticlesPageSlice'
import { fetchArticlesList } from '../../models/service/fetchArticlesList/fetchArticlesList'
import { fetchNextArticlePage } from '../../models/service/fetchNextArticlePage/fetchNextArticlePage'

import styles from './ArticlesPage.module.scss'

interface ArticlesPageProps {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props

    const dispatch = useAppDispatch()

    const {
        _inited,
        isLoading = true,
        error,
        view,
        order,
        sort,
        search = '',
        filters,
    } = useAppSelector((state) => state.articlesPage) || {}
    const articles = useAppSelector(getArticles.selectAll)

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }))
    }, [dispatch])

    const fetchArticlesListDebounce = useDebounce(fetchData)

    useEffect(() => {
        if (_inited) {
            fetchArticlesListDebounce()
        }
    }, [dispatch, _inited, order, sort, search, fetchArticlesListDebounce])

    const handleMoreArticles = useCallback(() => {
        if (!error) {
            dispatch(fetchNextArticlePage())
        }
    }, [error, dispatch])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ScrollActionsLayout
                isRestoringScroll
                isLoading={isLoading}
                onScroll={handleMoreArticles}
            >
                <StickyLayout
                    left={<ViewSelectorContainer />}
                    right={<FiltersContainer className={styles.filtersContainer} />}
                    content={
                        <div data-testid="ArticlesPage" className={cn(styles.wrapper, className)}>
                            <ArticleList
                                isLoading={isLoading}
                                view={view || 'list'}
                                items={articles}
                            />
                        </div>
                    }
                />
            </ScrollActionsLayout>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)
