import React, { FC, useEffect, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import { DynamicModuleLoader } from '@shared/components/DynamicModuleLoader/DynamicModuleLoader'
import { Icon } from '@shared/ui/Icon/Icon'
import { Skeleton } from '@shared/ui/Skeleton/Skeleton'
import { Avatar } from '@shared/ui/Avatar/Avatar'

import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { ArticleBlock, IArticle } from '../../model/types/article'
import { ArticleCodeBlock } from '../ArticleCodeBlock/ArticleCodeBlock'
import { ArticleImageBlock } from '../ArticleImageBlock/ArticleImageBlock'
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock'



import styles from './ArticleDetails.module.scss'


const reducers = {
    articleDetails: articleDetailsReducer
}

interface IArticleDetailsProps {
    className?: string
    data?: IArticle
    isLoading?: boolean
    error?: string
}
export const ArticleDetails: FC<IArticleDetailsProps> = memo(function ArticleDetails(props) {
    const {
        className,
        data,
        isLoading,
        error,
    } = props

    const { t } = useTranslation()

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case "CODE":
                return (
                    <ArticleCodeBlock
                        key={block.id}
                        block={block}
                        className={styles.block}
                    />
                )
            case "IMAGE":
                return (
                    <ArticleImageBlock
                        key={block.id}
                        block={block}
                        className={styles.block}
                    />
                )
            case "TEXT":
                return (
                    <ArticleTextBlock
                        key={block.id}
                        className={styles.block}
                        block={block}
                    />
                )
            default:
                return null
        }
    }, [])

    let content

    if (isLoading) {
        content = (
            <>
                <Skeleton className={styles.avatar} width={200} height={200} border="50%" />
                <Skeleton className={styles.title} width={300} height={32} />
                <Skeleton className={styles.skeleton} width={600} height={24} />
                <Skeleton className={styles.skeleton} width="100%" height={200} />
                <Skeleton className={styles.skeleton} width="100%" height={200} />
            </>
        )
    } else if (error) {
        content = (
            <span>{t('Произошла ошибка при загрузке статьи.')}</span>
        )
    } else {
        content = (
            <>
                <div className={styles.avatarWrapper}>
                    <Avatar
                        size={200}
                        src={data?.img}
                        className={styles.avatar}
                    />
                </div>

                <div data-testid="ArticleDetails.Info">
                    <div
                        className={styles.title}
                    >
                        {data?.title}
                    </div>
                    <div>
                        {data?.subtitle}
                    </div>
                </div>
                <div className={styles.articleInfo}>
                    <Icon className={styles.icon} id="Eye" />
                    <span >
                        {String(data?.views)}
                    </span>
                </div>
                <div className={styles.articleInfo}>
                    <Icon className={styles.icon} id="Calendar" />
                    <span>
                        {data?.createdAt}
                    </span>
                </div>
                {data?.blocks.map(renderBlock)}
            </>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} >
            <div className={cn(styles.ArticleDetails, className)}>
                {content}
            </div>
        </DynamicModuleLoader>
    )
})

