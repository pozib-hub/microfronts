import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@app/providers/StoreProvider'
import parseApiErrors from '@shared/api/parseApiErrors'
import { API_Errors } from '@shared/api/types'

import { IArticle } from '../../types/article'
import { articleDetailsActions } from '../../slice/articleDetailsSlice'

interface IProps {
    id?: string
}

export const fetchArticleById = createAsyncThunk<
    IArticle,
    IProps,
    ThunkConfig<API_Errors | string>
>(
    'articles/fetchArticleById',
    async (props = {}, thunkAPI): Promise<IArticle> => {
        const { id } = props
        const { dispatch, rejectWithValue, extra } = thunkAPI

        try {
            const response = await extra.api.get<IArticle>('articles/' + id)

            if (!response.data) {
                throw new Error('error')
            }

            // dispatch(articleDetailsActions.setData(response.data))

            return response.data
        } catch (error) {
            throw rejectWithValue(parseApiErrors(error))
        }
    },
)
