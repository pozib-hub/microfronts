export { getCanEditArticle } from './model/selectors/article'

export {
    fetchCommentsByArticleId
} from './model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'

export {
    ArticleDetailsPageAsync as ArticleDetailsPage,
} from './ui/ArticleDetailsPage/ArticleDetailsPage/ArticleDetailsPage.async'

export { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema'
export {
    ArticleDetailsRecommendationsSchema
} from './model/types/ArticleDetailsRecommendationsSchema'

export {
    fetchArticleRecommendations
} from './model/services/fetchArticleRecommendations/fetchArticleRecommendations'

export {
    ArticleDetailsPageSchema
} from './model/types/index'
