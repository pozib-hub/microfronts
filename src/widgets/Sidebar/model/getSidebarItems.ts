import { useSelector } from 'react-redux'

import { routePath } from '@shared/const/router'
import { getUserAuthData } from '@entities/user'

import { ISidebarItem } from '../types'

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData)

    const sidebarItemsList: ISidebarItem[] = [
        {
            path: routePath.main,
            iconId: 'Home_2',
            text: 'main',
            size: 38,
        },
        {
            path: routePath.about,
            iconId: 'Info_2',
            text: 'about',
            size: 38,
        },
    ]

    if (userData) {
        sidebarItemsList.push(
            {
                path: routePath.profile(),
                iconId: 'UserFilled',
                text: 'profile',
                authOnly: true,
                size: 38,
            },
            {
                path: routePath.articles,
                iconId: 'Article_2',
                text: 'articles',
                authOnly: true,
                size: 38,
            },
            {
                path: routePath.subdivisionsList,
                text: 'subdivisions',
                iconId: 'MapLocation',
                authOnly: true,
            },
        )
    }

    return sidebarItemsList
}
