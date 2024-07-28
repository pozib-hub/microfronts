import React from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'src/shared/lib/classNames/classNames'
import { AppLink } from 'src/shared/ui/AppLink/AppLink'

import style from './Navbar.module.scss'

interface INavbarProps {
  className?: string;
}

export const Navbar = (props: INavbarProps) => {
    const { className } = props

    const { t } = useTranslation()

    return (
        <div className={cn(style.navbar, className)}>
            <div className={style.links}>
                <AppLink className={style.logo} to="/">
                    {t('Главная')}
                </AppLink>
                <AppLink to="about">{t('about')}</AppLink>
            </div>
        </div>
    )
}
