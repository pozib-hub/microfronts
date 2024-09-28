import { RouteProps } from 'react-router-dom'

import { UserRole } from '@entities/user'

import { Test } from '@pages/Tests'
import { AboutPage } from '@pages/AboutPage'
import { MainPage } from '@pages/MainPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { ProfilePage } from '@pages/ProfilePage'
import { ArticlesPage } from '@pages/ArticlesPage'
import { ArticleDetailsPage } from '@pages/ArticleDetailsPage'
import { CharacteristicsUVHDPage } from '@pages/CharacteristicsUVHD'
import { ArticleEditPage } from '@pages/ArticleEditPage'
import { AdminPanelPage } from '@pages/AdminPanelPage'
import { ForbiddenPage } from '@pages/ForbiddenPage'

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
    roles?: UserRole[]
}

export const routePath = {
    "main": '/',
    "forbidden": "/forbidden",
    "about": '/about',
    "profile": (id?: string) => `/profile${id ? `/${id}` : ""}`,
    "articles": '/articles',
    "articleDetail": (id: string) => `/articles/${id}`,
    "articleEdit": (id: string) => `/ articles / ${id}/edit`,
    "articleCreate": '/articles/create',
    "adminPanel": "admin/panel",

    "CharacteristicsUVHD": '/CharacteristicsUVHD',
    "test": '/test',
}
export const routeConfig: AppRoutesProps[] = [
    {
        path: routePath.main,
        element: <MainPage />,
    },
    {
        path: routePath.forbidden,
        element: <ForbiddenPage />,
    },
    {
        path: routePath.about,
        element: <AboutPage />,
    },
    {
        path: routePath.profile() + "/:id?",
        element: <ProfilePage />,
        authOnly: true,
    },
    {
        path: routePath.articles,
        authOnly: true,
        element: <ArticlesPage />,
    },
    {
        path: routePath.articles + "/:id",
        element: <ArticleDetailsPage />,
    },
    {
        path: routePath.articles + "/:id/edit",
        element: <ArticleEditPage />,
    },
    {
        path: routePath.articles + "/create",
        element: <ArticleEditPage />,
    },
    {
        path: routePath.CharacteristicsUVHD,
        element: <CharacteristicsUVHDPage />,
        authOnly: true,
    },
    {
        path: routePath.test,
        element: <Test />,
        authOnly: true,
    },
    {
        path: routePath.adminPanel,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN]
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]
