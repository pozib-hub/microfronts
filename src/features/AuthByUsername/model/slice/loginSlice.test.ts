import { LoginSchema } from "../types/loginSchema"
import { loginActions, loginReducer } from "./loginSlice"

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: PartialDeep<LoginSchema> = {
            username: "admin"
        }
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setUsername("admin"))
        )
            .toEqual({
                username: "admin",
            })
    })

    test('test set password', () => {
        const state: PartialDeep<LoginSchema> = {
            password: "admin"
        }
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setPassword("admin"))
        )
            .toEqual({
                password: "admin",
            })
    })
})