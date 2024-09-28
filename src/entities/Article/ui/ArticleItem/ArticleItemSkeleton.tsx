import cn from '@shared/lib/classNames/classNames'
import { memo } from 'react'
import { Card } from '@shared/ui/Card/Card'
import { Skeleton } from '@shared/ui/Skeleton/Skeleton'
import styles from './ArticleItem.module.scss'
import { ArticleDisplayType } from '@shared/const/articles'

interface IArticleItemSkeletonProps {
    className?: string;
    view: ArticleDisplayType
}

export const ArticleItemSkeleton =
    memo(function ArticleItemSkeleton(props: IArticleItemSkeletonProps) {
        const {
            className,
            view
        } = props

        if (view === "list") {
            return (
                <div className={cn(styles.wrapper, className, styles[view])}>
                    <Card className={styles.card}>
                        <div className={styles.header}>
                            <Skeleton border="50%" height={30} width={30} />
                            <Skeleton width={150} height={16} className={styles.username} />
                            <Skeleton width={150} height={16} className={styles.date} />
                        </div>
                        <Skeleton width={250} height={24} className={styles.title} />
                        <Skeleton height={200} className={styles.img} />
                        <div className={styles.footer}>
                            <Skeleton height={36} width={200} />
                        </div>
                    </Card>
                </div>
            )
        }

        return (
            <div className={cn(styles.wrapper, {}, [className, styles[view]])}>
                <Card className={styles.card}>
                    <div className={styles.image_wrapper}>
                        <Skeleton width={200} height={200} className={styles.img} />
                    </div>
                    <div className={styles.info}>
                        <Skeleton width={130} height={16} />
                    </div>
                    <Skeleton width={150} height={16} className={styles.title} />
                </Card>
            </div>
        )
    })
