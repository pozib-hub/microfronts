

export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId("EditableProfileCardHeader.EditButton").click()
    cy.getByTestId("ProfileCard.firstname").clear().type(firstname)
    cy.getByTestId("ProfileCard.lastname").clear().type(lastname)
    cy.getByTestId("EditableProfileCardHeader.SaveButton").click()
}

export const sendUpdateProfile = (id: string) => {
    return cy.request({
        method: 'PUT',
        url: 'http://localhost:8000/api/profile/' + id,
        headers: {
            Authorization: "asasa"
        },
        body: {
            form: {
                id: "4",
                firstname: "testuser",
                lastname: "testuser",
                age: 99,
                address: {
                    "city": "testuser"
                },
                hobbies: [
                    "reading",
                    "painting",
                    "hiking"
                ],
                // eslint-disable-next-line max-len
                avatar: "https://masterpiecer-images.s3.yandex.net/146e5f2470fe11ee87c22aa0df1cd6e5:upscaled",
                username: "testuser"
            }
        },
    })
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>
            sendUpdateProfile(id: string): Chainable<void>
        }
    }
}
