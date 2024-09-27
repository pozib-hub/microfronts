export { StoreProvider } from './ui/StoreProvider'
export { createReducerManager } from './config/reducerManager'
export type {
    StateSchema,
    IReduceManager,
    ReduxStoreWithManager,
    ThunkExtraArg,
    ThunkConfig
} from './config/StateSchema'
export {
    createReduxStore,
    staticReducers
} from './config/store'

export type {
    AppStore,
    AppDispatch,
    AppState,
} from './types/appStore'