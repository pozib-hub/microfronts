import { IUser } from './../../../src/entities/user/model/types/user'
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage'
import { selectByTestId } from '../../helpers/selectByTestId'

export const login = (
    username: string = "testuser",
    password: string = "testuser"
) => {
    return cy.request({
        method: 'POST',
        // url: process.env.URL_API + 'login',
        url: 'http://localhost:8000/api/login',
        body: {
            username,
            password
        },
        headers: { 'Content-Type': 'application/json' },
    }).then(({ body }) => {
        window.localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(body)
        )

        return body
    })
}

export const getByTestId = (testId: string) => {
    return cy.get(selectByTestId(testId))
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<IUser>;
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
