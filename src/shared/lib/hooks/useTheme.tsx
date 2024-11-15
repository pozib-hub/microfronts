import { useContext } from 'react'

import { ThemeContext } from '../context/ThemeContext'
import { Theme } from '../../const/them'

const getNextTheme = (theme?: Theme) => {
    switch (theme) {
        case Theme.LIGHT:
            return Theme.ORANGE
        case Theme.DARK:
            return Theme.LIGHT
        case Theme.ORANGE:
            return Theme.DARK
        default:
            return Theme.LIGHT
    }
}

export default () => {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        const newTheme = getNextTheme(theme)
        setTheme?.(newTheme)
    }

    return {
        theme,
        toggleTheme,
    }
}
