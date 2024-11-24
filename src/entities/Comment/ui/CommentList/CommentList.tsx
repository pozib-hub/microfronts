import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { VStack } from '@shared/ui/Stack'

import { IComment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'

import styles from './CommentList.module.scss'

interface ICommentListProps {
    className?: string
    comments: IComment[]
    isLoading: boolean
}
export const CommentList: FC<ICommentListProps> = memo(function CommentList(props) {
    const { className, comments, isLoading } = props

    const { t } = useTranslation('comments')

    if (isLoading) {
        return (
            <VStack gap={4} fullWidth className={cn(className)}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        )
    }

    if (!comments.length) {
        return <div className={cn(styles.empty)}>{t('list.empty')}</div>
    }

    return (
        <VStack className={cn(styles.wrapper, className)} gap={4} fullWidth>
            {comments.map((c, i) => (
                <CommentCard key={c.id || i} comment={c} isLoading={isLoading} />
            ))}
        </VStack>
    )
})
