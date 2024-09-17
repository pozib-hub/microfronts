import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { IArticle } from 'entities/Article'
import parseApiErrors from 'shared/api/parseApiErrors'
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams'

interface IFetchArticlesListProps {
    replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
    IArticle[],
    IFetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlePage/fetchArticlesList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi

        const {
            order,
            page = 1,
            limit = 10,
            search,
            filters,
        } = getState().articlesPage || {}

        const filtersToURL = filters ? JSON.stringify(filters) : undefined

        const params = {
            page,
            limit,
            order,
            search,
            filters,
        }

        addQueryParams({
            ...params,
            filters: filtersToURL
        })

        try {
            const response = await extra.api.get<IArticle[]>('/articles', {
                params
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
