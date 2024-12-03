import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { AppLink } from '@shared/ui/AppLink/AppLink'
import { Icon } from '@shared/ui/Icon/Icon'

import { ISidebarItem } from '../../model/items'

import styles from './SidebarItem.module.scss'

interface ISidebarItemProps {
    className?: string
    isActive?: boolean
    item: ISidebarItem
    collapsed?: boolean
    onClick: () => void
}

export const SidebarItem: FC<ISidebarItemProps> = memo(function SidebarItem(props) {
    const { className, collapsed, item, onClick } = props

    const { t } = useTranslation()

    const defaultSizeIcon = item.size || 30
    const sizeIcon = !collapsed ? defaultSizeIcon - 8 : defaultSizeIcon

    return (
        <AppLink
            to={item.path}
            className={cn(
                styles.item,
                {
                    [styles.collapsed]: collapsed,
                },
                className,
            )}
            onClick={onClick}
            title={t(`sidebar.items.${item.text}`)}
        >
            <Icon id={item.iconId} size={sizeIcon} />
            <span className={styles.link}>{t(`sidebar.items.${item.text}`)}</span>
        </AppLink>
    )
})
