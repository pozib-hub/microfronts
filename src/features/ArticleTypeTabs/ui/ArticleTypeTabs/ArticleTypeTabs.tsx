import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import { ArticleType } from '@entities/Article'
import { Tags } from '@shared/ui/Tags/Tags'
import { Text } from '@shared/ui/Text'
import { VStack } from '@shared/ui/Stack'

interface ArticleTypeTabsProps {
    className?: string
    types: ArticleType[]
    onChangeTypes: (type: ArticleType[]) => void
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, types, onChangeTypes } = props
    const { t } = useTranslation('articles')

    const typeTabs = useMemo(
        () => [
            {
                value: ArticleType.SCIENCE,
                label: t('filters.thematics.science'),
            },
            {
                value: ArticleType.IT,
                label: t('filters.thematics.it'),
            },
            {
                value: ArticleType.BACKEND,
                label: t('filters.thematics.backend'),
            },
            {
                value: ArticleType.FRONTEND,
                label: t('filters.thematics.frontend'),
            },
            {
                value: ArticleType.DEVELOPMENT,
                label: t('filters.thematics.development'),
            },
            {
                value: ArticleType.TECH,
                label: t('filters.thematics.tech'),
            },
        ],
        [t],
    )

    return (
        <VStack gap={3}>
            <Text>{t('filtersTopicsTitle')}</Text>
            <Tags
                className={cn(className)}
                isMulti
                direction="column"
                tags={typeTabs}
                value={types}
                onChange={(v) => onChangeTypes(v.map((v) => v.value))}
            />
        </VStack>
    )
})
