import { routePath } from '@shared/const/router'
import { IconId } from '@shared/ui/Icon/Icon'
export interface ISidebarItem {
    path: string
    text: string
    authOnly?: boolean
    // Icon: React.FC<React.SVGProps<SVGSVGElement>>
    iconId: IconId
    onClick?: (path?: string) => void
}


export const sidebarLinkItems: ISidebarItem[] = [
    {
        path: routePath.main,
        text: 'main',
        iconId: 'Main',
    },
    {
        path: routePath.about,
        text: 'about',
        iconId: 'About'
    },
    {
        path: routePath.profile(),
        text: 'profile',
        iconId: 'Profile',
        authOnly: true
    },
    {
        path: routePath.articles,
        text: 'articles',
        iconId: 'Article',
        authOnly: true
    },
    {
        path: routePath.articleCreate,
        text: 'articleCreate',
        iconId: 'Tiles',
        authOnly: true
    }
]

// export const sidebarBottomItems: ISidebarItem[] = [
//     {
//         path: routePath.main,
//         text: 'main',
//         Icon: IconMain,
//     },
// ]