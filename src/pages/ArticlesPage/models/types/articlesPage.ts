import { EntityState } from '@reduxjs/toolkit'
import { IArticle } from '@entities/Article'
import { ArticleSortField, ArticleType } from '@entities/Article'
import { OrderType } from '@shared/types/sort'
import { ArticleView } from '@entities/Article/model/types/article'

export interface ArticlesPageSchema extends EntityState<IArticle, IArticle['id']> {
    isLoading?: boolean
    error?: string

    view: ArticleView

    order?: OrderType
    sort: ArticleSortField
    search: string

    filters?: {
        type: ArticleType[]
    }

    page: number
    limit?: number
    totalCount?: number
    hasMore: boolean
    _inited?: boolean
}
