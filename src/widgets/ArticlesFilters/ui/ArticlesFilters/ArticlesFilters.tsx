import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { Card } from '@shared/ui/Card'
import { ArticleSortSelector } from '@features/ArticleSortSelector'
import { ArticleTypeTabs } from '@features/ArticleTypeTabs'
import { VStack } from '@shared/ui/Stack'
import { ArticleSortField, ArticleType } from '@entities/Article'
import { OrderType } from '@shared/types/sort'
import { Input } from '@shared/ui/Input'
import { Icon } from '@shared/ui/Icon/Icon'

import styles from './ArticlesFilters.module.scss'

interface ArticlesFiltersProps {
    className?: string
    sort: ArticleSortField
    order: OrderType
    types: ArticleType[]
    search: string
    onChangeSearch: (value: string) => void
    onChangeOrder: (newOrder: OrderType) => void
    onChangeSort: (newSort: ArticleSortField) => void
    onChangeTypes: (type: ArticleType[]) => void
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const {
        className,
        search,
        sort,
        order,
        types,
        onChangeSort,
        onChangeOrder,
        onChangeTypes,
        onChangeSearch,
    } = props

    const { t } = useTranslation()

    return (
        <Card className={cn(styles.wrapper, className)} padding={4}>
            <VStack gap={8}>
                <Input
                    onChange={(e) => onChangeSearch(e.target.value)}
                    value={search}
                    size="s"
                    placeholder={t('search')}
                    addonLeft={<Icon id="Search" />}
                />
                <ArticleTypeTabs
                    types={types}
                    onChangeTypes={onChangeTypes}
                    className={styles.tabs}
                />
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    )
})
