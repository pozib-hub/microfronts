import { memo, useCallback, useEffect } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { ArticleList } from '@entities/Article'
import { DynamicModuleLoader } from '@shared/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { useDebounce } from '@shared/lib/hooks/useDebounce'

import { ScrollActionsLayout } from '@widgets/ScrollActionsLayout'
import {
    articlesPageReducer,
    getArticles
} from '../../models/slice/ArticlesPageSlice'
import {
    fetchArticlesList
} from '../../models/service/fetchArticlesList/fetchArticlesList'
import {
    fetchNextArticlePage
} from '../../models/service/fetchNextArticlePage/fetchNextArticlePage'
import { ArticlesPageHeader } from '../ArticlesPageHeader/ArticlesPageHeader'

import styles from './ArticlesPage.module.scss'

const reducers = {
    articlesPage: articlesPageReducer
}

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props

    const dispatch = useAppDispatch()

    const {
        _inited,
        isLoading = true,
        view,
        order,
        sort,
        search = "",
        filters,
    } = useAppSelector(state => state.articlesPage) || {}
    const articles = useAppSelector(getArticles.selectAll)

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }))
    }, [dispatch])

    const fetchArticlesListDebounce = useDebounce(fetchData)

    useEffect(() => {
        if (_inited) {
            fetchArticlesListDebounce()
        }
    }, [dispatch, _inited, order, sort, search, filters, fetchArticlesListDebounce])

    const handleMoreArticles = useCallback(() => {
        dispatch(fetchNextArticlePage())
    }, [dispatch])


    return (
        <DynamicModuleLoader reducers={reducers}>
            <ScrollActionsLayout
                isRestoringScroll
                isLoading={isLoading}
                onScroll={handleMoreArticles}
            >
                <div className={cn(styles.wrapper, className)}>
                    <ArticlesPageHeader />
                    <ArticleList
                        isLoading={isLoading}
                        view={view || "list"}
                        items={articles}
                    />
                </div>
            </ScrollActionsLayout>
        </DynamicModuleLoader >
    )
}

export default memo(ArticlesPage)
