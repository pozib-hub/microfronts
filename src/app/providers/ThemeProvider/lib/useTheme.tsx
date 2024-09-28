import { useContext } from 'react'

import BrowserStorage from '@utils/BrowserStorage'

import { Theme, ThemeContext, KEY_THEME_BROWSER_STORAGE } from './ThemeContext'

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
        BrowserStorage.set(KEY_THEME_BROWSER_STORAGE, newTheme)
        document.body.className = newTheme
        setTheme?.(newTheme)
    }

    return {
        theme,
        toggleTheme,
    }
}
