import React, { FC } from 'react'

import useTheme from '@shared/lib/hooks/useTheme'
import { Icon } from '@shared/ui/Icon/Icon'

import style from './ThemeSwitcher.module.scss'

interface IThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher: FC<IThemeSwitcherProps> = (props) => {
    const { className } = props
    const { theme, toggleTheme } = useTheme()

    return <Icon id="Theme" clickable onClick={toggleTheme} />
}
