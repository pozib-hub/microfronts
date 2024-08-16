import { useContext } from 'react'

import BrowserStorage from 'src/utils/BrowserStorage'

import { Theme, ThemeContext, KEY_THEME_BROWSER_STORAGE } from './ThemeContext'

export default () => {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        BrowserStorage.set(KEY_THEME_BROWSER_STORAGE, newTheme)
        document.body.className = newTheme
        setTheme?.(newTheme)
    }

    return {
        theme,
        toggleTheme,
    }
}
