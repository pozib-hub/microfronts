import React, { FC, memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { Loader } from '@shared/ui/Loader/Loader'
import { AddCommentForm } from '@features/addCommentForm'
import { CommentList } from '@entities/Comment'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import {
    addCommentForArticle
} from '../../model/services/addCommentForArticle/addCommentForArticle'
import {
    fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'

import styles from './ArticleDetailsComments.module.scss'

interface IArticleDetailsCommentsProps {
    className?: string
    id?: string
}
export const ArticleDetailsComments: FC<IArticleDetailsCommentsProps> =
    memo(function ArticleDetailsComments(props) {
        const {
            className,
            id,
        } = props

        const { t } = useTranslation()
        const dispatch = useAppDispatch()

        useEffect(() => {
            if (id) {
                dispatch(fetchCommentsByArticleId(id))
            }
        }, [dispatch, id])

        const {
            isLoading = false,
        } = useAppSelector(s => s.articleDetailsPage?.comments) || {}

        const {
            isLoading: isLoadingForm = false,
        } = useAppSelector(s => s.addCommentForm) || {}

        const comments = useAppSelector(getArticleComments.selectAll)

        const onSendComment = useCallback((text: string) => {
            dispatch(addCommentForArticle(text))
        }, [dispatch])

        if (!id) {
            <div className={cn(styles.wrapper, className)}>
                <h3 className={styles.title}>Коментарии</h3>

                <Loader />
            </div>
        }

        return (
            <div className={cn(styles.wrapper, className)}>
                <h3 className={styles.title}>Коментарии</h3>

                <AddCommentForm
                    isLoading={isLoadingForm}
                    onSendComment={onSendComment}
                />
                <div className={styles.list}>
                    <CommentList
                        isLoading={isLoading}
                        comments={comments}
                    />
                </div>
            </div>
        )
    })

