import React, { FC, HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { Icon } from '@shared/ui/Icon/Icon'
import { Card } from '@shared/ui/Card'
import { useHover } from '@shared/lib/hooks/useHover'
import { Avatar } from '@shared/ui/Avatar'
import { AppLink } from '@shared/ui/AppLink'
import { AppImage } from '@shared/ui/AppImage'
import { Text } from '@shared/ui/Text'
import { Skeleton } from '@shared/ui/Skeleton'
import { routePath } from '@shared/const/router'
import { HStack, VStack } from '@shared/ui/Stack'
import { Button } from '@shared/ui/Button'

import { ArticleView, IArticle } from '../../model/types/article'

import styles from './ArticleListItem.module.scss'

interface IArticleListItemProps {
    className?: string
    item: IArticle
    view: ArticleView
    target?: HTMLAttributeAnchorTarget
}
export const ArticleListItem: FC<IArticleListItemProps> = memo(function ArticleListItem(props) {
    const { className, item, view, target } = props

    const [isHover, bindHover] = useHover()
    const { t } = useTranslation('articles')

    const types = item.type.join(', ')
    const textBlock = item.blocks.find((b) => b.type === 'TEXT')

    let userInfo

    if (item.user) {
        userInfo = (
            <AppLink to={routePath.profile(item.user.id)}>
                <HStack gap={2}>
                    <Avatar size={22} src={item.user?.avatar} className={styles.avatar} />
                    <Text bold size="s">
                        {item.user?.username}
                    </Text>
                </HStack>
            </AppLink>
        )
    } else {
        userInfo = (
            <HStack gap={2}>
                <Avatar size={22} className={styles.avatar} />
            </HStack>
        )
    }

    const views = (
        <HStack gap={1} justify="center">
            <Icon id="Eye" size={16} />
            <Text className={styles.views} size="s">
                {String(item.views)}
            </Text>
        </HStack>
    )

    if (view === 'list') {
        const textBlock = item.blocks.find((block) => block.type === 'TEXT')

        return (
            <Card
                fullWidth
                padding={6}
                data-testid="ArticleListItem"
                className={cn(styles.wrapper, className, styles[view])}
            >
                <VStack gap={4}>
                    <HStack fullWidth justify="between">
                        {userInfo}
                        <Text>{item.createdAt}</Text>
                    </HStack>
                    <Text title={item.title} bold />
                    <Text title={item.subtitle} size="s" />
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={item.img}
                        className={styles.img}
                        alt={item.title}
                    />
                    {textBlock?.paragraphs && (
                        <Text className={styles.textBlock}>
                            {textBlock.paragraphs.slice(0, 2).join(' ')}
                        </Text>
                    )}
                    <HStack fullWidth justify="between">
                        <AppLink target={target} to={routePath.articleDetail(item.id)}>
                            <Button variant="clear">{t('details.readMore')}</Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        )
    }

    return (
        <Card
            className={cn(styles[view], className)}
            data-testid="ArticleListItem"
            border="partial"
            padding={0}
        >
            <AppLink
                target={target}
                to={routePath.articleDetail(item.id)}
                className={cn(styles.card)}
            >
                <div className={styles.wrapperImg}>
                    <AppImage
                        fallback={<Skeleton width="100%" height={140} border="20px" />}
                        alt={item.title}
                        src={item.img}
                        className={styles.img}
                    />
                </div>
                <VStack className={styles.info} padding={2}>
                    <Text className={styles.title} title={item.title} size="s" />
                    <VStack className={styles.footer} fullWidth gap={1}>
                        <HStack fullWidth justify="between">
                            <Text className={styles.date} size="s">
                                {item.createdAt}
                            </Text>
                            {views}
                        </HStack>
                    </VStack>
                </VStack>
            </AppLink>
            <HStack gap={1} padding={2}>
                {userInfo}
            </HStack>
        </Card>
    )
})
