import React, { memo, useState, FC, useMemo } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Button } from '@shared/ui/Button/Button'
import { ThemeSwitcher } from '@features/ThemeSwitcher'
import { LanguageSwitcher } from '@features/LanguageSwitcher'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { VStack } from '@shared/ui/Stack'

import { sidebarLinkItems } from '../../../model/items'
import { SidebarItem } from '../../SidebarItem/SidebarItem'

import styles from './DeprecatedSidebar.module.scss'

interface ISidebarProps {
    className?: string
}

export const DeprecatedSidebar: FC<ISidebarProps> = memo(function Sidebar(props) {
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
            <div className={styles.content}>
                <Button
                    data-testid="sidebar-toggle"
                    className={styles['btn-burger']}
                    onClick={onToggle}
                >
                    {open ? '<' : '>'}
                </Button>
                <VStack role="navigation" gap="8" padding="16" align={open ? 'start' : 'end'}>
                    {linksItems.map((item) => (
                        <SidebarItem key={item.path} item={item} collapsed={!open} />
                    ))}
                </VStack>
                <div className={cn(styles.bottom, styleCollapsed)}>
                    <LanguageSwitcher className={styles.bottom_item} />
                    <ThemeSwitcher className={styles.bottom_item} />
                </div>
            </div>
        </aside>
    )
})
