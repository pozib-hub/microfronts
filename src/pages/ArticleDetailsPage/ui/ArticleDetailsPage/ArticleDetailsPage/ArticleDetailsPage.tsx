import cn from 'shared/lib/classNames/classNames'
import { memo, useCallback, useEffect } from 'react'
import styles from './ArticleDetailsPage.module.scss'
import { ArticleDetails, ArticleList } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { CommentList } from 'entities/Comment'
import {
    DynamicModuleLoader,
    ReducersList
} from 'shared/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector'
import { AddCommentForm } from 'features/addCommentForm'
import { fetchArticleRecommendations, fetchCommentsByArticleId } from 'pages/ArticleDetailsPage'
import {
    addCommentForArticle
} from 'pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle'
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById'
import {
    getArticleComments
} from '../../../model/slices/articleDetailsCommentsSlice'
import {
    getRecommendations
} from '../../../model/slices/articleDetailsRecommendationsSlice'
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'

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
        isLoading = false,
    } = useAppSelector(s => s.articleDetailsPage?.comments) || {}

    const {
        isLoading: isLoadingForm = false,
    } = useAppSelector(s => s.addCommentForm) || {}

    const {
        isLoading: isLoadingArticles,
        data: articles,
        error: errorArticles
    } = useAppSelector(state => state.articleDetails) || {}

    const {
        isLoading: isLoadingRecommendations,
        error: errorRecommendations
    } = useAppSelector(state => state.articleDetailsPage?.recommendations) || {}

    const recommendations = useAppSelector(getRecommendations.selectAll)
    const comments = useAppSelector(getArticleComments.selectAll)

    useEffect(() => {
        dispatch(fetchArticleRecommendations())

        dispatch(fetchArticleById({ id }))
            .then(result => {
                if (result.meta.requestStatus === "fulfilled") {
                    dispatch(fetchCommentsByArticleId(id))
                }
            })

    }, [dispatch, id])

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cn(styles.wrapper, className)}>
                <ArticleDetailsPageHeader />
                <ArticleDetails
                    data={articles}
                    isLoading={isLoadingArticles}
                    error={errorArticles}
                />

                <div className={styles.block_recommendations}>
                    Рекомендуем
                    <ArticleList
                        className={styles.recommendations}
                        view='tiles'
                        isLoading={isLoadingRecommendations}
                        items={recommendations}
                        target='_blank'
                    />
                </div>

                <div className={styles.comments}>
                    <h3 className={styles.title}>Коментарии</h3>

                    <AddCommentForm
                        isLoading={isLoadingForm}
                        onSendComment={onSendComment}
                    />
                    <div className={styles.comments__list}>
                        <CommentList
                            isLoading={isLoading}
                            comments={comments}
                        />
                    </div>
                </div>
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)


