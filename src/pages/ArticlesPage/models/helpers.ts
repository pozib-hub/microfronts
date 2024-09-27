import { ArticleSortField } from "entities/Article"
import { ArticleDisplayType } from "shared/const/articles"
import { OrderType } from "shared/const/common"

export const getSortField = (): ArticleSortField => {
    return localStorage.getItem("articles-sort") as ArticleSortField || ArticleSortField.CREATED_AT
}

export const getView = (): ArticleDisplayType => {
    return localStorage.getItem("articles-view") as ArticleDisplayType || "list"
}

export const getLimitByView = (): number => {
    const view = getView()
    return view === "list" ? 10 : 20
}

export const getOrder = (): OrderType => {
    return localStorage.getItem("articles-order") as OrderType || "desc"
}