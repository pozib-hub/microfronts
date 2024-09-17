import React, { FC, memo } from 'react'

import cn from 'shared/lib/classNames/classNames'

import styles from './CommentCard.module.scss'
import { IComment } from 'entities/Comment/model/types/comment'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { routePath } from 'shared/config/routerConfig/routerConfig'

interface ICommentCardProps {
    className?: string,
    comment: IComment,
    isLoading: boolean
}
export const CommentCard: FC<ICommentCardProps> =
    memo(function CommentCard(props) {
        const {
            className,
            comment,
            isLoading,
        } = props

        if (isLoading) {
            return (
                <div className={cn(styles.wrapper, className)}>
                    <div className={styles.header}>
                        <Skeleton width={30} height={30} border="50%" />
                        <Skeleton height={16} width={100} className={styles.username} />
                    </div>
                    <Skeleton className={styles.text} width="100%" height={50} />
                </div>
            )
        }

        if (!comment) {
            return null
        }

        return (
            <div className={cn(styles.wrapper, className)}>
                <AppLink to={`${routePath.profile}/${comment.user.id}`}>
                    <div className={styles.header}>
                        {
                            comment.user.avatar
                                ? <Avatar size={30} src={comment.user.avatar} />
                                : null
                        }
                        <span className={styles.username} title={comment.user.username} >
                            {comment.user.username}
                        </span>
                    </div>
                </AppLink>
                <span className={styles.text} title={comment.text} >
                    {comment.text}
                </span>
            </div>
        )
    })

