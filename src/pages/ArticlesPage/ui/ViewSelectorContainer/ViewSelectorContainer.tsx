import { memo } from 'react'
import { ArticleViewSelector } from '@features/ArticleViewSelector'
import { useArticleFilters } from '../../lib/hooks/useArticleFilters'

interface IViewSelectorContainerProps {
    className?: string
}

export const ViewSelectorContainer = memo((props: IViewSelectorContainerProps) => {
    const { className } = props
    const { view, onChangeView } = useArticleFilters()

    return <ArticleViewSelector className={className} view={view} onViewClick={onChangeView} />
})
