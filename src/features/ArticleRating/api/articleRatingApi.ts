import { rtkApi } from '@shared/api/rtkApi'
import { IRating } from '@entities/Rating'

interface GetArticleRatingArg {
    articleId: string;
}

interface RateArticleArg {
    articleId: string;
    rate: number;
    feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<IRating[], GetArticleRatingArg>({
            query: ({ articleId }) => ({
                url: '/rating/articles',
                params: {
                    articleId,
                },
            }),
        }),
        rateArticle: build.mutation<void, RateArticleArg>({
            query: (arg) => ({
                url: '/rating/articles',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
})

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery
export const useRateArticle = articleRatingApi.useRateArticleMutation
