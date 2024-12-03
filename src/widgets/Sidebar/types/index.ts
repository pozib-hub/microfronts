import { IconId } from '@shared/ui/Icon/Icon'

export interface ISidebarItem {
    path: string
    text: string
    authOnly?: boolean
    size?: number
    iconId: IconId
    onClick?: (path?: string) => void
}
