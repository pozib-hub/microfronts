import { useTranslation } from 'react-i18next'
import { memo, useMemo } from 'react'

import cn from '@shared/lib/classNames/classNames'
// import { Select, SelectOption } from '@shared/ui/Select'
import { ArticleSortField } from '@entities/Article'
import { ListBox } from '@shared/ui/Popups'
import { ListBoxItem } from '@shared/ui/Popups/components/ListBox/ListBox'
import { VStack } from '@shared/ui/Stack'
import { Text } from '@shared/ui/Text'
import { OrderType } from '@shared/types/sort'

import styles from './ArticleSortSelector.module.scss'

interface ArticleSortSelectorProps {
    className?: string
    sort: ArticleSortField
    order: OrderType
    onChangeOrder: (newOrder: OrderType) => void
    onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { className, onChangeOrder, onChangeSort, order, sort } = props

    const { t } = useTranslation('articles')

    const orderOptions = useMemo<ListBoxItem<OrderType>[]>(
        () => [
            {
                value: 'asc',
                content: t('order.asc'),
            },
            {
                value: 'desc',
                content: t('order.desc'),
            },
        ],
        [t],
    )

    const sortFieldOptions = useMemo<ListBoxItem<ArticleSortField>[]>(
        () => [
            {
                value: ArticleSortField.CREATED_AT,
                content: t('filters.fields.createdAt'),
            },
            {
                value: ArticleSortField.TITLE,
                content: t('filters.fields.title'),
            },
            {
                value: ArticleSortField.VIEWS,
                content: t('filters.fields.views'),
            },
        ],
        [t],
    )

    return (
        <VStack className={cn(styles.wrapper, className)} fullWidth gap={3}>
            <Text>{t('filtersTitle')}</Text>
            <VStack fullWidth gap={2}>
                <ListBox max items={sortFieldOptions} value={sort} onChange={onChangeSort} />
                <ListBox max items={orderOptions} value={order} onChange={onChangeOrder} />
            </VStack>
        </VStack>
    )
})
