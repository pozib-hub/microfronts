import { ArticleSortField } from '@entities/Article'
import { ArticleView } from '@entities/Article'
import { OrderType } from '@shared/types/sort'

export const getSortField = (): ArticleSortField => {
    return (
        (localStorage.getItem('articles-sort') as ArticleSortField) || ArticleSortField.CREATED_AT
    )
}

export const getView = (): ArticleView => {
    return (localStorage.getItem('articles-view') as ArticleView) || 'list'
}

export const getLimitByView = (): number => {
    const view = getView()
    return view === 'list' ? 10 : 20
}

export const getOrder = (): OrderType => {
    return (localStorage.getItem('articles-order') as OrderType) || 'desc'
}
