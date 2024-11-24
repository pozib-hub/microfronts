import { memo } from 'react'

import cn from '@shared/lib/classNames/classNames'

import { Card } from '@shared/ui/Card'
import { Skeleton } from '@shared/ui/Skeleton'
import { HStack, VStack } from '@shared/ui/Stack'

import { ArticleView } from '../../model/types/article'

import styles from './ArticleListItem.module.scss'

interface IArticleListItemSkeletonProps {
    className?: string
    view: ArticleView
}

export const ArticleListItemSkeleton = memo(function ArticleListItemSkeleton(
    props: IArticleListItemSkeletonProps,
) {
    const { className, view } = props

    if (view === 'list') {
        return (
            <div className={cn(styles.wrapper, className, styles[view])}>
                <Card padding={6} border="round" className={styles.card}>
                    <VStack gap={4}>
                        <div className={styles.header}>
                            <Skeleton border="50%" height={30} width={30} />
                            <Skeleton
                                border="8px"
                                width={150}
                                height={16}
                                className={styles.username}
                            />
                            <Skeleton width={150} height={16} className={styles.date} />
                        </div>
                        <Skeleton border="8px" width={250} height={24} className={styles.title} />
                        <Skeleton border="8px" height={200} className={styles.img} />
                        <HStack fullWidth justify="between">
                            <Skeleton border="8px" height={18} width={60} />
                            <Skeleton border="8px" height={18} width={60} />
                        </HStack>
                    </VStack>
                </Card>
            </div>
        )
    }

    return (
        <div className={cn(styles.wrapper, className, styles[view])}>
            <Card border="partial" className={styles.card}>
                <Skeleton width="100%" height={150} border="20px" className={styles.img} />
                <div className={styles.infoWrapper}>
                    <Skeleton width={130} height={16} />
                </div>
                <Skeleton width={150} height={16} className={styles.title} />
            </Card>
        </div>
    )
})
