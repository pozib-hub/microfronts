import { StateSchema } from 'app/providers/StoreProvider'

export const getProfileFormSelector = (state: StateSchema) => state.editProfile?.form
