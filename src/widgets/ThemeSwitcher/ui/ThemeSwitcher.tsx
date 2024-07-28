import React, { FC } from 'react'

import cn from 'src/shared/lib/classNames/classNames'
import { useTheme } from 'src/app/providers/ThemeProvider'
import { Button } from 'src/shared/ui/Button/Button'

import { iconByTheme } from '../utils'

import style from './ThemeSwitcher.module.scss'

interface IThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<IThemeSwitcherProps> = (props) => {
    const { className } = props
    const { theme, toggleTheme } = useTheme()

    return (
        <div className={cn(style.className, className)}>
            <Button onClick={toggleTheme}>{iconByTheme[theme]}</Button>
        </div>
    )
}
