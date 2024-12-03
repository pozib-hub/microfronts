import React, { FC, memo } from 'react'

import cn from '@shared/lib/classNames/classNames'

import { Skeleton } from '@shared/ui/Skeleton'
import { Avatar } from '@shared/ui/Avatar'
import { AppLink } from '@shared/ui/AppLink'
import { Text } from '@shared/ui/Text'
import { routePath } from '@shared/const/router'
import { HStack, VStack } from '@shared/ui/Stack'
import { Card } from '@shared/ui/Card'

import { IComment } from '../../model/types/comment'

import styles from './CommentCard.module.scss'

interface ICommentCardProps {
    className?: string
    comment?: IComment
    isLoading: boolean
}
export const CommentCard: FC<ICommentCardProps> = memo(function CommentCard(props) {
    const { className, comment, isLoading } = props

    if (isLoading) {
        return (
            <Card fullWidth border="partial">
                <VStack
                    data-testid="CommentCard.Loading"
                    fullWidth
                    gap={2}
                    className={cn(styles.wrapper, className, styles.loading)}
                >
                    <div className={styles.header}>
                        <Skeleton width={30} height={30} border="50%" />
                        <Skeleton height={16} width={100} className={styles.username} />
                    </div>
                    <Skeleton className={styles.text} width="100%" height={50} />
                </VStack>
            </Card>
        )
    }

    if (!comment) {
        return null
    }

    const userInfo = comment.user ? (
        <AppLink to={routePath.profile(comment.user.id)}>
            <HStack gap={2}>
                <Avatar size={30} src={comment.user?.avatar} />
                <Text bold>{comment.user.username}</Text>
            </HStack>
        </AppLink>
    ) : (
        <Avatar size={30} />
    )

    return (
        <Card fullWidth border="partial">
            <VStack
                data-testid="CommentCard.Content"
                fullWidth
                gap={2}
                className={cn(styles.wrapper, className)}
            >
                {userInfo}
                <Text>{comment.text}</Text>
            </VStack>
        </Card>
    )
})
