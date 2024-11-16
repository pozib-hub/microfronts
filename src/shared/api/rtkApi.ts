import { userActions } from '@entities/user'
import {
    BaseQueryFn, createApi,
    FetchArgs, fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'

import { USER_LOCALSTORAGE_KEY } from '@shared/const/localstorage'


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.URL_API,
    prepareHeaders: headers => {
        const token = localStorage.getItem(USER_LOCALSTORAGE_KEY)
        if (token) {
            headers.set("Authorization", token)
        }
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        api.dispatch(userActions.logout())
        // const refreshResult = await baseQuery('token/refresh/', api, extraOptions)

        // if (refreshResult.data) {
        //     api.dispatch(tokenUpdated({ accessToken: refreshResult.data as string }))

        //     // retry the initial query
        //     result = await baseQuery(args, api, extraOptions)
        // } else {
        //     api.dispatch(logout())
        // }
    }
    return result
}


export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})