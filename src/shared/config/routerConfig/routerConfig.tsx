import { RouteProps } from 'react-router-dom'

import { AboutPage } from 'src/pages/AboutPage'
import { MainPage } from 'src/pages/MainPage'
import { NotFoundPage } from 'src/pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'
import { ArticlesPage } from 'pages/ArticlesPage'
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage'
import { CharacteristicsUVHDPage } from 'pages/CharacteristicsUVHD'
import { Test } from 'pages/Tests'
import { ArticleEditPage } from 'pages/ArticleEditPage'

export type AppRoutesProps = Omit<RouteProps, "children"> & {
    authOnly?: boolean
    children?: RouteProps[]
}

export const routePath = {
    "main": '/',
    "about": '/about',
    "profile": (id?: string) => `/profile${id ? `/${id}` : ""}`,
    "articles": '/articles',
    "articleDetail": (id: string) => `/articles/${id}`,
    "articleEdit": (id: string) => `/ articles / ${id}/edit`,
    "articleCreate": '/articles/create',


    "CharacteristicsUVHD": '/CharacteristicsUVHD',
    "test": '/test',
}

export const routeConfig: AppRoutesProps[] = [
    {
        path: '*',
        element: <NotFoundPage />,
    },
    {
        path: routePath.main,
        element: <MainPage />,
    },
    {
        path: routePath.about,
        element: <AboutPage />,
    },
    {
        path: routePath.profile() + ":id?",
        element: <ProfilePage />,
        authOnly: true,
    },
    {
        path: routePath.articles,
        authOnly: true,
        // element: <ProfilePage />,
        children: [
            {
                path: "/",
                element: <ArticlesPage />,
            },
            {
                path: ":id?",
                element: <ArticleDetailsPage />,
            },
            {
                path: ":id/edit",
                element: <ArticleEditPage />,
            },
            // {
            //     path: "create",
            //     element: <ArticleCreat />,
            // },
        ],
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
]
