import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/providers/StoreProvider'
import { IArticle } from '@entities/Article'
import parseApiErrors from '@shared/api/parseApiErrors'

export const fetchArticleRecommendations = createAsyncThunk<
    IArticle[],
    void,
    ThunkConfig<string>
>(
    'articleDetails/fetchArticleRecommendations',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        try {
            const response = await extra.api.get<IArticle[]>('/articles', {
                params: {
                    limit: 4,
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
