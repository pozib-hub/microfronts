import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { HStack, VStack } from '@shared/ui/Stack'
import { Avatar } from '@shared/ui/Avatar'
import { Text } from '@shared/ui/Text'
import { Button } from '@shared/ui/Button'
import { AppLink } from '@shared/ui/AppLink'
import { routePath } from '@shared/const/router'
import { IArticle } from '@entities/Article'

import styles from './ArticleAdditionalInfo.module.scss'

interface IArticleAdditionalInfoProps {
    className?: string
    isCanEdit: boolean
    article: IArticle
    onEdit: () => void
}

export const ArticleAdditionalInfo = memo((props: IArticleAdditionalInfoProps) => {
    const { className, isCanEdit, article, onEdit } = props

    const { t } = useTranslation(['translation', 'articles'])

    const { createdAt, user: author, views } = article

    const authorInfo = author ? (
        <AppLink to={routePath.profile(author?.id)} state={{ article: article }}>
            <VStack align="center">
                <Avatar src={author?.avatar} size={32} />
                <Text>{author?.username}</Text>
            </VStack>
        </AppLink>
    ) : (
        <VStack align="center">
            <Avatar size={32} />
        </VStack>
    )

    return (
        <VStack gap={4} className={cn(styles.wrapper, className)}>
            <HStack fullWidth justify="between">
                {isCanEdit && (
                    <Button size="s" variant="filled" onClick={onEdit}>
                        {t('edit')}
                    </Button>
                )}
                {authorInfo}
            </HStack>
            <VStack gap={1}>
                <Text size="s">{t('details.createdAt', { ns: 'articles' }) + ' ' + createdAt}</Text>
                <Text size="s">{t('details.views', { count: views, ns: 'articles' })}</Text>
            </VStack>
        </VStack>
    )
})
