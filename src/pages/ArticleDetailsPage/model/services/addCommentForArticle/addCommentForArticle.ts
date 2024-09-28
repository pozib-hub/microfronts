import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/providers/StoreProvider'
import { IComment } from '@entities/Comment'
import parseApiErrors from '@shared/api/parseApiErrors'
import {
    fetchCommentsByArticleId,
} from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId'

export const addCommentForArticle = createAsyncThunk<
    IComment,
    string,
    ThunkConfig<string>
>(
    'ArticleDetailsPage/addCommentForArticle',
    async (text, thunkApi) => {
        const {
            extra, dispatch, rejectWithValue, getState,
        } = thunkApi

        const userData = getState().user.authData
        const article = getState().articleDetails?.data
        // const text = getState().addCommentForm?.text

        if (!userData || !text || !article) {
            return rejectWithValue('no data')
        }

        try {
            const response = await extra.api.post<IComment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text,
            })

            if (!response.data) {
                throw new Error("error")
            }

            dispatch(fetchCommentsByArticleId(article.id))

            return response.data
        } catch (e) {
            return rejectWithValue(parseApiErrors(e))
        }
    },
)
