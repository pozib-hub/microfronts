import React, {
    useState, FC, useMemo, useEffect,
} from 'react'

// import BrowserStorage from "src/utils/BrowserStorage";
import BrowserStorage from '@utils/BrowserStorage'

import {
    ThemeContext,
} from '../../../../shared/lib/context/ThemeContext'
import { KEY_THEME_BROWSER_STORAGE } from '@shared/const/localstorage'
import { Theme } from '@shared/const/them'

const getSaveTheme = async () => {
    try {
        return BrowserStorage.get<Theme>(KEY_THEME_BROWSER_STORAGE)
    } catch (error) {
        return null
    }
}

interface IThemeProviderProps {
    children?: React.ReactNode
    initialTheme?: Theme
}

const ThemeProvider: FC<IThemeProviderProps> = ({ children, initialTheme }) => {
    const [theme, setTheme] = useState<Theme>(initialTheme || Theme.LIGHT)

    useEffect(() => {
        getSaveTheme()
            .then((t) => {
                const _theme = t || theme
                setTheme(_theme)
                document.body.className = _theme
            })
            .catch(() => { })
    }, [theme])

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
