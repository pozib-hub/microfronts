import { StateSchema } from 'app/providers/StoreProvider'

export const getScrollPage =
    (path: string) =>
        (state: StateSchema) => state.globalSettings.scrollPageRestore[path] || 0