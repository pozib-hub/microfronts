import React, { FC } from 'react'

import cn from 'src/shared/lib/classNames/classNames'
import { useTheme } from 'src/app/providers/ThemeProvider'
import { Button } from 'src/shared/ui/Button/Button'

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
        <div className={cn(style.className, className)}>
            <Button variant='transparent' onClick={toggleTheme}>{<Icon />}</Button>
        </div>
    )
}
