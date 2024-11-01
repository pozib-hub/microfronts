import React, { FC } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Button } from '@shared/ui/Button/Button'
import useTheme from '@shared/lib/hooks/useTheme'

import { getIconByTheme } from '../utils'

import style from './ThemeSwitcher.module.scss'

interface IThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<IThemeSwitcherProps> = (props) => {
    const { className } = props
    const { theme, toggleTheme } = useTheme()

    const Icon = getIconByTheme(theme)

    return (
        <div className={cn(style.themeSwitcher, className)}>
            <Button variant='transparent' onClick={toggleTheme}>{Icon}</Button>
        </div>
    )
}
