import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/providers/StoreProvider'
import { articlesPageActions } from '../../slice/ArticlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

export const fetchNextArticlePage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlePage/fetchNextArticlePage',
    async (props, thunkApi) => {
        const { getState, dispatch } = thunkApi

        const {
            isLoading,
            hasMore,
            page = 1,
            search = "",
            order,
        } = getState().articlesPage || {}

        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1))
            dispatch(fetchArticlesList({}))
        }
    },
)
