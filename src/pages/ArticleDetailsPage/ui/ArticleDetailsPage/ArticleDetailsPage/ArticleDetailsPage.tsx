import cn from '@shared/lib/classNames/classNames'
import { memo, useEffect } from 'react'
import { ArticleDetails } from '@entities/Article'
import { useParams } from 'react-router-dom'
import {
    DynamicModuleLoader,
    ReducersList
} from '@shared/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { fetchArticleById } from '@entities/Article'
import { ArticleRating } from '@features/ArticleRating'

import { articleDetailsPageReducer } from '../../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleRecommendationsList } from '@features/ArticleRecommendationsList'
import { ArticleDetailsComments } from '../../ArticleDetailsComments/ArticleDetailsComments'

import styles from './ArticleDetailsPage.module.scss'

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
}

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props

    const { id } = useParams()

    const dispatch = useAppDispatch()

    const {
        isLoading: isLoadingArticles,
        data: articles,
        error: errorArticles
    } = useAppSelector(state => state.articleDetails) || {}


    useEffect(() => {
        dispatch(fetchArticleById({ id }))
    }, [dispatch, id])


    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cn(styles.wrapper, className)}>
                <ArticleDetailsPageHeader />
                <ArticleDetails
                    data={articles}
                    isLoading={isLoadingArticles}
                    error={errorArticles}
                />
                {id && <ArticleRating articleId={id} />}
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id} />
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)


