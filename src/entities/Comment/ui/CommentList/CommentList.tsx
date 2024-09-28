import React, { FC, memo } from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './CommentList.module.scss'
import { IComment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'

interface ICommentListProps {
    className?: string
    comments: IComment[]
    isLoading: boolean
}
export const CommentList: FC<ICommentListProps> =
    memo(function CommentList(props) {
        const {
            className,
            comments,
            isLoading,
        } = props

        const items = isLoading ? [...new Array(3).fill({})] : comments

        return (
            <div className={cn(styles.wrapper, className)}>
                {
                    items.map((c, i) =>
                        <div key={c.id || i}>
                            <CommentCard comment={c} isLoading={isLoading} />
                        </div>
                    )
                }
            </div>
        )
    })

