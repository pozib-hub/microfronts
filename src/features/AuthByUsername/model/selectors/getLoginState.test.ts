
import { StateSchema } from 'app/providers/StoreProvider'
import { getLoginState } from './getLoginState'

describe('getLoginError.test', () => {
    test('should return error', () => {
        const state: PartialDeep<StateSchema> = {
            loginForm: {
                username: "admin",
                password: "admin",
                isLoading: true,
                error: 'error',
            },
        }
        expect(getLoginState(state as StateSchema))
            .toEqual({
                username: "admin",
                password: "admin",
                isLoading: true,
                error: 'error',
            })
    })
    test('should work with empty state', () => {
        const state: PartialDeep<StateSchema> = {}
        expect(getLoginState(state as StateSchema))
            .toEqual(undefined)
    })
})
