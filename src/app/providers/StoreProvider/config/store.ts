import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { userReducer } from 'entities/user'

import { $api } from 'shared/api/api'
import { StateSchema, ThunkExtraArg } from './StateSchema'
import { createReducerManager } from './reducerManager'
import { globalSettingsReducer } from 'entities/globalSettings'
import { rtkApi } from 'shared/api/rtkApi'

export const staticReducers = {
    user: userReducer,
    globalSettings: globalSettingsReducer
}

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        ...staticReducers,
        [rtkApi.reducerPath]: rtkApi.reducer
    }

    const reducerManager = createReducerManager<StateSchema>(rootReducers)

    const extraArg: ThunkExtraArg = {
        api: $api,
    }

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<StateSchema>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }).concat(rtkApi.middleware),
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

// Get the type of our store variable
export type AppStore = ReturnType<typeof createReduxStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

