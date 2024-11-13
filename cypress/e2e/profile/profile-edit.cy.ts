let profileId = ''

describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.visit('')
        cy.login()
            .then((data) => {
                profileId = data.id
                cy.visit(`profile/${data.id}`)
            })
    })
    afterEach(() => {
        cy.sendUpdateProfile(profileId)
    })
    it('И профиль успешно загружается', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'testuser')
    })
    it('И редактирует его', () => {
        const newName = 'new'
        const newLastname = 'lastname'
        cy.updateProfile(newName, newLastname)
        cy.getByTestId('ProfileCard.firstname').should('have.value', newName)
        cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname)
    })
})
