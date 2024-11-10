import { screen } from "@testing-library/dom"

import componentRender from "@shared/lib/tests/componentRender/componentRender"
import { routePath } from "@shared/const/router"
import { UserRole } from "@entities/user"

import AppRouter from "./AppRouter"

describe("AppRouter tests", () => {
    test('About page found successfully ', async () => {
        componentRender(<AppRouter />, {
            initialRoute: routePath.about
        })

        const page = await screen.findByTestId("AboutPage")
        expect(page).toBeInTheDocument()
    })

    test('Page not found ', async () => {
        componentRender(<AppRouter />, {
            initialRoute: "/asad"
        })

        const page = await screen.findByTestId("NotFoundPage")
        expect(page).toBeInTheDocument()
    })

    test('Redirect if the user is not logged in', async () => {
        componentRender(<AppRouter />, {
            initialRoute: routePath.profile("1")
        })

        const page = await screen.findByTestId("MainPage")
        expect(page).toBeInTheDocument()
    })

    test('If the user is logged in', async () => {
        componentRender(<AppRouter />, {
            initialRoute: routePath.profile("1"),
            initialState: {
                user: {
                    _inited: true,
                    authData: {
                        id: "1",
                        username: "testUser"
                    }
                }
            }
        })

        const page = await screen.findByTestId("ProfilePage")
        expect(page).toBeInTheDocument()
    })

    test('The user does not have access', async () => {
        componentRender(<AppRouter />, {
            initialRoute: routePath.adminPanel,
            initialState: {
                user: {
                    _inited: true,
                    authData: {
                        id: "1",
                        username: "testUser"
                    }
                }
            }
        })

        const page = await screen.findByTestId("ForbiddenPage")
        expect(page).toBeInTheDocument()
    })

    test('The user has access', async () => {
        componentRender(<AppRouter />, {
            initialRoute: routePath.adminPanel,
            initialState: {
                user: {
                    _inited: true,
                    authData: {
                        id: "1",
                        username: "testUser",
                        roles: [UserRole.ADMIN]
                    }
                }
            }
        })

        const page = await screen.findByTestId("AdminPanelPage")
        expect(page).toBeInTheDocument()
    })
})