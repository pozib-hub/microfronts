import React, {
    useState, FC, useMemo, useEffect,
} from 'react'

// import BrowserStorage from "src/utils/BrowserStorage";
import BrowserStorage from 'src/utils/BrowserStorage'

import {
    Theme,
    ThemeContext,
    KEY_THEME_BROWSER_STORAGE,
} from '../lib/ThemeContext'

const getSaveTheme = async () => {
    try {
        return BrowserStorage.get<Theme>(KEY_THEME_BROWSER_STORAGE)
    } catch (error) {
        return null
    }
}

interface IThemeProviderProps {
    children?: React.ReactNode
}

const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)

    useEffect(() => {
        getSaveTheme()
            .then((t) => setTheme(t))
            .catch(() => {})
    }, [])

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    )

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
