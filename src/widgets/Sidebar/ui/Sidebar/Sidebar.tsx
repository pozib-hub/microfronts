import React, { memo, useState, FC, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import cn from '@shared/lib/classNames/classNames'
import { ThemeSwitcher } from '@features/ThemeSwitcher'
import { LanguageSwitcher } from '@features/LanguageSwitcher'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { VStack } from '@shared/ui/Stack'
import { AppLogo } from '@shared/ui/AppLogo'
import { Icon } from '@shared/ui/Icon/Icon'

import { useSidebarItems } from '../../model/getSidebarItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'

import styles from './Sidebar.module.scss'

interface ISidebarProps {
    className?: string
}

const defaultStateSidebar = localStorage.getItem('sidebar') === 'true'

const getCurrentLocation = (location: string) => {
    const [, path] = location.split('/')
    return '/' + path
}

export const Sidebar: FC<ISidebarProps> = memo(function Sidebar(props) {
    const { className } = props

    const location = useLocation()
    const isAuth = useAppSelector((state) => state.user.authData)
    const [open, setOpen] = useState<boolean>(defaultStateSidebar)
    const [selectedItem, setSelectedItem] = useState('')

    const sideBarItems = useSidebarItems()

    useEffect(() => {
        setSelectedItem(getCurrentLocation(location.pathname))
    }, [location.pathname])

    const onToggle = () => {
        setOpen((prev) => {
            localStorage.setItem('sidebar', String(!prev))
            return !prev
        })
    }

    const items = useMemo(() => {
        return sideBarItems.filter((i) => !(i.authOnly && !isAuth))
    }, [isAuth, sideBarItems])

    const styleCollapsed = { [styles.collapsed]: !open }

    // Индекс активного элемента для перемещения индикатора
    const activeIndex = useMemo(() => {
        return items.findIndex((item) => selectedItem === item.path)
    }, [items, selectedItem])

    const itemHeight = 35
    const gapBetweenItems = 8
    const isExistActiveIndex = activeIndex !== -1
    const transformActiveIndicator = `translateY(${activeIndex * (itemHeight + gapBetweenItems)}px)`

    return (
        <aside data-testid="sidebar" className={cn(styles.wrapper, styleCollapsed, className)}>
            <AppLogo className={styles.appLogo} size={open ? 50 : 30} />
            <VStack className={styles.items} role="navigation" gap={2}>
                {/* Индикатор активного элемента */}
                {isExistActiveIndex && (
                    <div
                        className={styles.activeIndicator}
                        style={{
                            height: itemHeight,
                            transform: transformActiveIndicator,
                        }}
                    />
                )}

                {items.map((item, index) => (
                    <SidebarItem
                        key={item.path}
                        item={item}
                        collapsed={!open}
                        onClick={() => setSelectedItem(item.path)}
                    />
                ))}
            </VStack>
            <Icon
                data-testid="sidebar-toggle"
                id="ArrowBottom"
                onClick={onToggle}
                className={styles.collapseBtn}
                clickable
            />
            <div className={styles.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher className={styles.lang} />
            </div>
        </aside>
    )
})
