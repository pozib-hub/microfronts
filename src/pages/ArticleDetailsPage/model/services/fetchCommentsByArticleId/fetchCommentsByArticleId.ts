import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/providers/StoreProvider'
import { IComment } from '@entities/Comment'
import parseApiErrors from '@shared/api/parseApiErrors'

export const fetchCommentsByArticleId = createAsyncThunk<
    IComment[],
    string | undefined,
    ThunkConfig<string>
>(
    'ArticleDetailsPage/fetchCommentsByArticleId',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        if (!articleId) {
            return rejectWithValue('error')
        }

        try {
            const response = await extra.api.get<IComment[]>('/comments', {
                params: {
                    articleId,
                    order: "desc"
                },
            })

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (error) {
            return rejectWithValue(parseApiErrors(error))
        }
    },
)
