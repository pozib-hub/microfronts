import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'shared/lib/classNames/classNames'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { Text } from 'shared/ui/Text/Text'
import { ISidebarItem } from 'widgets/Sidebar/model/items'
import { Icon } from 'shared/ui/Icon/Icon'

import styles from './SidebarItem.module.scss'

interface ISidebarItemProps {
    className?: string
    item: ISidebarItem
    collapsed?: boolean
}

export const SidebarItem: FC<ISidebarItemProps> = memo(function SidebarItem(props) {
    const {
        className,
        collapsed,
        item
    } = props

    const { t } = useTranslation()

    const { path, text, iconId } = item

    return (
        <AppLink
            key={path}
            className={cn(styles.SidebarItem, className)}
            to={path}
        >
            <Icon id={iconId} size={20} />
            {!collapsed && <Text>{t(text)}</Text>}
        </AppLink>
    )
})

