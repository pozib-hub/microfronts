import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"
import { fetchNextArticlePage } from "./fetchNextArticlePage"
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList"

jest.mock("../fetchArticlesList/fetchArticlesList")

describe('fetchNextArticlePage.test', () => {
    test('fetch data success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage: {
                isLoading: false,
                hasMore: true,
                page: 2,
                limit: 5,

            }
        })

        await thunk.callThunk()

        expect(thunk.dispatch).toHaveBeenCalledTimes(4)
        expect(fetchArticlesList).toHaveBeenCalled()

    })

    test('fetch not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage: {
                isLoading: false,
                hasMore: false,
                page: 2,
                limit: 5,
            }
        })

        await thunk.callThunk()

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(fetchArticlesList).not.toHaveBeenCalled()

    })

})