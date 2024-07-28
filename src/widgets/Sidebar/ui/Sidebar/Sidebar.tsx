import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'src/shared/lib/classNames/classNames'
import { Button } from 'src/shared/ui/Button/Button'
import { ThemeSwitcher } from 'src/widgets/ThemeSwitcher'
import { LanguageSwitcher } from 'src/widgets/LanguageSwitcher'

import styles from './Sidebar.module.scss'

interface ISidebarProps {
    className?: string
}

export const Sidebar = (props: ISidebarProps) => {
    const { className } = props

    const { t } = useTranslation()
    const [open, setOpen] = useState(false)

    const onToggle = () => setOpen((prev) => !prev)

    return (
        <div
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
                    {t('toggle')}
                </Button>
                <div>
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
            </div>
        </div>
    )
}
