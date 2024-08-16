import { routePath } from 'shared/config/routerConfig/routerConfig'
import IconMain from 'shared/assets/icons/main-20-20.svg'
import IconProfile from 'shared/assets/icons/profile-20-20.svg'
import IconAbout from 'shared/assets/icons/about-20-20.svg'

export interface ISidebarItem {
    path: string
    text: string
    authOnly?: boolean
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
    onClick?: (path?: string) => void
}


export const sidebarLinkItems: ISidebarItem[] = [
    {
        path: routePath.main,
        text: 'main',
        Icon: IconMain,
    },
    {
        path: routePath.about,
        text: 'about',
        Icon: IconAbout,
    },
    {
        path: routePath.profile,
        text: 'profile',
        Icon: IconProfile,
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