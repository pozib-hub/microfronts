import { combineReducers, Reducer, ReducersMapObject } from "@reduxjs/toolkit"
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice"
import { articleDetailsRecommendationsReducer } from "./articleDetailsRecommendationsSlice"
import { ArticleDetailsPageSchema } from "../types"

// export const articleDetailsPageReducer: Reducer<ArticleDetailsPageSchema> = {
//     comments: articleDetailsCommentsReducer,
//     recommendations: articleDetailsRecommendationsReducer,
// } 

export const articleDetailsPageReducer = combineReducers({
    comments: articleDetailsCommentsReducer,
    recommendations: articleDetailsRecommendationsReducer,
})