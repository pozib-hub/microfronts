import { createReduxStore } from "../config/store"

// // Get the type of our store variable
export type AppStore = ReturnType<typeof createReduxStore>
// // Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<AppStore['getState']>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
