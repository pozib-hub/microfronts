import React, { memo, useState, FC, useMemo } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Button } from '@shared/ui/Button/Button'
import { ThemeSwitcher } from '@features/ThemeSwitcher'
import { LanguageSwitcher } from '@features/LanguageSwitcher'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { VStack } from '@shared/ui/Stack'

import { sidebarLinkItems } from '../../../model/items'
import { SidebarItem } from '../../SidebarItem/SidebarItem'

import styles from './NewSidebar.module.scss'

interface ISidebarProps {
    className?: string
}

export const NewSidebar: FC<ISidebarProps> = memo(function Sidebar(props) {
    const { className } = props

    const isAuth = useAppSelector((state) => state.user.authData)
    const [open, setOpen] = useState(false)

    const onToggle = () => setOpen((prev) => !prev)

    const styleCollapsed = { [styles.collapsed]: !open }

    const linksItems = useMemo(() => {
        return sidebarLinkItems.filter((i) => !(i.authOnly && !isAuth))
    }, [isAuth])

    return (
        <aside
            data-testid="sidebar"
            className={cn(styles.sidebar, className, { [styles.open]: open })}
        >
            {/* <AppLogo className={cls.appLogo} /> */}
        </aside>
    )
})
