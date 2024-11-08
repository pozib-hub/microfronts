import React, { FC, HTMLAttributeAnchorTarget, memo } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Icon } from '@shared/ui/Icon/Icon'
import { Card } from '@shared/ui/Card/Card'
import { useHover } from '@shared/lib/hooks/useHover'
import { Avatar } from '@shared/ui/Avatar/Avatar'
import { routePath } from '@shared/const/router'
import { AppLink } from '@shared/ui/AppLink/AppLink'
import { ArticleDisplayType } from '@shared/const/articles'

import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock'
import { IArticle } from '../../model/types/article'

import styles from './ArticleItem.module.scss'

interface IArticleItemProps {
    className?: string
    item: IArticle,
    view: ArticleDisplayType
    target?: HTMLAttributeAnchorTarget
}
export const ArticleItem: FC<IArticleItemProps> =
    memo(function ArticleItem(props) {
        const {
            className,
            item,
            view,
            target,
        } = props

        const [isHover, bindHover] = useHover()

        const types = item.type.join(", ")
        const textBlock = item.blocks.find(b => b.type === "TEXT")

        if (view === "list") {
            return <>
                <div className={cn(styles.wrapper, styles[view], className)} >
                    <Card className={styles.card}>
                        <div className={styles.header}>
                            <AppLink
                                target={target}
                                to={routePath.profile(item.user?.id)}
                                state={{
                                    article: {
                                        title: item.title,
                                        id: item.id,
                                    }
                                }}
                            >
                                <Avatar size={30} src={item.user?.avatar} />
                            </AppLink>
                            <span className={styles.username}>
                                {item.user?.username}
                            </span>
                            <span className={styles.date}>
                                {item.createdAt}
                            </span>
                        </div>
                        <div>
                            <h3>{item.title}</h3>
                        </div>
                        <span className={styles.types}>{types}</span>
                        <img className={styles.img} src={item.img} alt={item.title} />
                        {textBlock && (
                            <ArticleTextBlock
                                className={styles.text_block}
                                block={textBlock}
                            />)
                        }
                        <div className={styles.footer}>
                            <AppLink
                                target={target}
                                to={routePath.articleDetail(item.id)}>
                                читать далее...
                            </AppLink>
                            {item.views}
                        </div>
                    </Card >
                </ div >
            </>
        }

        return (
            <div {...bindHover} className={cn(styles.wrapper, styles[view], className)}>
                <AppLink target={target} to={routePath.articleDetail(item.id)}>
                    <Card className={styles.card}>
                        <div className={styles.img_wrapper}>
                            <img className={styles.img} src={item.img} alt={item.title} />
                            <span className={styles.date}>{item.createdAt}</span>
                        </div>
                        <div className={styles.info}>
                            <p>{types}</p>
                            <div className={styles.views}>
                                {String(item.views)}
                                <Icon id="Eye" />
                            </div>
                        </div>
                        <span className={styles.title}>{item.title}</span>
                    </Card>
                </AppLink>
            </div>
        )
    })

