import { StateSchema } from '@app/providers/StoreProvider'

export const getFeaturesFlags = (state: StateSchema) => state.user.authData?.features || {}
