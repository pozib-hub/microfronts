// export { getCanEditArticle } from './model/selectors/article'

export { ArticleDetailsPageAsync as ArticleDetailsPage } from './ui/ArticleDetailsPage/ArticleDetailsPage.async'
export { articleDetailsPageReducer } from './model/slices'

export type { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema'
export type { ArticleDetailsRecommendationsSchema } from './model/types/ArticleDetailsRecommendationsSchema'

export type { ArticleDetailsPageSchema } from './model/types'

export { addCommentForArticle } from './model/services/addCommentForArticle/addCommentForArticle'
