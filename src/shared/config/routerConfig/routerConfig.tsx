import { RouteProps } from 'react-router-dom'

import { AboutPage } from 'src/pages/AboutPage'
import { MainPage } from 'src/pages/MainPage'
import { NotFoundPage } from 'src/pages/NotFoundPage'

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  NOT_FOUND = 'notFound'
}

export const routePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: RouteProps[] = [
    {
        path: routePath.main,
        element: <MainPage />,
    },
    {
        path: routePath.about,
        element: <AboutPage />,
    },
    {
        path: routePath.notFound,
        element: <NotFoundPage />,
    },
]
