import { EntityState } from "@reduxjs/toolkit"
import { IArticle } from "entities/Article"
import { ArticleSortField, ArticleType } from "entities/Article/model/types/article"
import { ArticleDisplayType } from "shared/const/articles"
import { OrderType } from "shared/const/common"

export interface ArticlesPageSchema extends EntityState<IArticle, IArticle["id"]> {
    isLoading?: boolean;
    error?: string;

    view: ArticleDisplayType

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