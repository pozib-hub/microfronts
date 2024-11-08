import React, { FC, HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { ArticleDisplayType } from '@shared/const/articles'

import { IArticle } from '../../model/types/article'
import { ArticleItem } from '../ArticleItem/ArticleItem'
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton'

import styles from './ArticleList.module.scss'

interface IArticleListProps {
    className?: string
    isLoading?: boolean
    items: IArticle[]
    view: ArticleDisplayType
    target?: HTMLAttributeAnchorTarget
}

const skeletonItems = (view: ArticleDisplayType) => {
    return [...new Array(view === "list" ? 9 : 30)
        .fill(null)]
        .map((_, index) => index)
}

export const ArticleList: FC<IArticleListProps> =
    memo(function ArticleList(props) {
        const {
            className,
            isLoading,
            items,
            view = "list",
            target,
        } = props

        const { t } = useTranslation("articles")

        if (!isLoading && !items.length) {
            return (
                <div className={cn(styles.wrapper, styles[view], className)}>
                    <span >{t('list.noFound')}</span>
                </div>
            )
        }

        return (
            <div className={cn(styles.wrapper, styles[view], className)}>
                {
                    items.map(item =>
                        <ArticleItem
                            target={target}
                            key={item.id}
                            view={view}
                            item={item}
                        />)
                }
                {
                    isLoading && skeletonItems(view)
                        .map((_, index) => <ArticleItemSkeleton key={index} view={view} />)
                }
            </div>
        )
    })

