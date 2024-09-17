import React, { memo, useState, FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'src/shared/lib/classNames/classNames'
import { Button } from 'src/shared/ui/Button/Button'
import { ThemeSwitcher } from 'src/widgets/ThemeSwitcher'
import { LanguageSwitcher } from 'src/widgets/LanguageSwitcher'
import { sidebarLinkItems } from 'widgets/Sidebar/model/items'

import styles from './Sidebar.module.scss'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector'

interface ISidebarProps {
    className?: string
}

export const Sidebar: FC<ISidebarProps> = memo(function Sidebar(props) {
    const { className } = props
    const { t } = useTranslation()

    const isAuth = useAppSelector(state => state.user.authData)
    const [open, setOpen] = useState(false)

    const onToggle = () => setOpen((prev) => !prev)

    const styleCollapsed = { [styles.collapsed]: !open }

    const linksItems = useMemo(() => {
        return sidebarLinkItems.filter(i => !(i.authOnly && !isAuth))
    }, [isAuth])

    return (
        <menu
            data-testid="sidebar"
            className={cn(
                styles.sidebar,
                className,
                { [styles.open]: open },
            )}
        >
            <div className={styles.content}>
                <Button
                    data-testid="sidebar-toggle"
                    className={styles['btn-burger']}
                    onClick={onToggle}
                >
                    {open ? "<" : ">"}
                </Button>
                <div className={cn(styles.linksItems, styleCollapsed)}>
                    {
                        linksItems.map(item =>
                            <SidebarItem key={item.path} item={item} collapsed={!open} />)
                    }
                </div>
                <div className={cn(styles.bottom, styleCollapsed)}>
                    <LanguageSwitcher className={styles.bottom_item} />
                    <ThemeSwitcher className={styles.bottom_item} />
                </div>
            </div>
        </menu>
    )
})
