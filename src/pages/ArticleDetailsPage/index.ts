export { getCanEditArticle } from './model/selectors/article'

export {
    fetchCommentsByArticleId
} from './model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'

export {
    ArticleDetailsPageAsync as ArticleDetailsPage,
} from './ui/ArticleDetailsPage/ArticleDetailsPage/ArticleDetailsPage.async'

export type { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema'
export type {
    ArticleDetailsRecommendationsSchema
} from './model/types/ArticleDetailsRecommendationsSchema'

export {
    fetchArticleRecommendations
} from './model/services/fetchArticleRecommendations/fetchArticleRecommendations'

export type {
    ArticleDetailsPageSchema
} from './model/types/index'
