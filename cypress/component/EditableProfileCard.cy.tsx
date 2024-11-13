import { EditableProfileCard } from "../../src/features/EditableProfileCard"
import { TestProvider } from "../../src/shared/lib/tests/componentRender/componentRender"

/* eslint-disable react/jsx-indent */
describe('EditableProfileCard.cy.tsx', () => {
  it('playground', () => {
    cy.intercept("GET", "**/profile?id=4", { fixture: "profile.json" })

    cy.mount(
      <TestProvider
        // eslint-disable-next-line react/jsx-indent-props
        options={{
          initialState: {
            user: {
              authData: {
                id: "4"
              }
            }
          }
        }}>
        <EditableProfileCard id="4" />
      </TestProvider>
    )
  })
})

