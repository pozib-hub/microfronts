import { USER_LOCALSTORAGE_KEY } from './../../../src/shared/const/localstorage'

export const login = (username: string = "testuser", password: string = "testuser") => {
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
        window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body))

        return body
    })
}