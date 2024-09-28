import { IArticle } from "@entities/Article"
import { rtkApi } from "@shared/api/rtkApi"

const articleRecommendationsApi = rtkApi.injectEndpoints({
    endpoints: builder => ({
        getArticleRecommendationsList: builder.query<IArticle[], number>({
            query: limit => ({ url: `/articles`, params: { limit } }),
        }),
    }),
})

export const useArticleRecommendationsList
    = articleRecommendationsApi.useGetArticleRecommendationsListQuery