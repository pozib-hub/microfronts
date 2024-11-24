import { memo } from 'react'
import { ArticlesFilters } from '@widgets/ArticlesFilters'
import { useArticleFilters } from '../../lib/hooks/useArticleFilters'

interface IFiltersContainerProps {
    className?: string
}

export const FiltersContainer = memo((props: IFiltersContainerProps) => {
    const { className } = props
    const {
        search,
        sort,
        order,
        types,
        onChangeTypes,
        onChangeSearch,
        onChangeSort,
        onChangeOrder,
    } = useArticleFilters()

    return (
        <ArticlesFilters
            types={types}
            onChangeTypes={onChangeTypes}
            className={className}
            order={order}
            search={search}
            sort={sort}
            onChangeSearch={onChangeSearch}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
        />
    )
})
