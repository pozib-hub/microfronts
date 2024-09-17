import cn from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo, useCallback, useEffect, useState } from 'react'
import styles from './ArticlesPage.module.scss'
import { ArticleList } from 'entities/Article'
import { DynamicModuleLoader } from 'shared/components/DynamicModuleLoader/DynamicModuleLoader'
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles
} from 'pages/ArticlesPage/models/slice/ArticlesPageSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector'
import {
    fetchArticlesList
} from 'pages/ArticlesPage/models/service/fetchArticlesList/fetchArticlesList'
import { Button } from 'shared/ui/Button/Button'
import { ScrollActionsLayout } from 'widgets/ScrollActionsLayout/ScrollActionsLayout'
import {
    fetchNextArticlePage

} from 'pages/ArticlesPage/models/service/fetchNextArticlePage/fetchNextArticlePage'
import { Modal } from 'shared/ui/Modal/Modal'
import { ArticlesPageHeader } from '../ArticlesPageHeader/ArticlesPageHeader'
import { Icon } from 'shared/ui/Icon/Icon'
import { useDebounce } from 'shared/lib/hooks/useDebounce'

const reducers = {
    articlesPage: articlesPageReducer
}

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props

    const { t } = useTranslation()
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
