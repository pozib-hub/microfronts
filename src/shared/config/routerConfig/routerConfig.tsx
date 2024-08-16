import { RouteProps } from 'react-router-dom'

import { AboutPage } from 'src/pages/AboutPage'
import { MainPage } from 'src/pages/MainPage'
import { NotFoundPage } from 'src/pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'


type AppRoutesProps = RouteProps & {
    authOnly?: boolean
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND = 'notFound',
    PROFILE = "profile",
}

export const routePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: AppRoutesProps[] = [
    {
        path: routePath.main,
        element: <MainPage />,
    },
    {
        path: routePath.about,
        element: <AboutPage />,
    },
    {
        path: routePath.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
    {
        path: routePath.notFound,
        element: <NotFoundPage />,
    },
]
