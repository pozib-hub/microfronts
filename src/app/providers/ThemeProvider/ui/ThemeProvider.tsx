import React, { FC, useMemo, useEffect, useState } from 'react'

import { ThemeContext } from '@shared/lib/context/ThemeContext'
import { Theme } from '@shared/const/theme'

interface IThemeProviderProps {
    children?: React.ReactNode
    initialTheme: Theme
}

const ThemeProvider: FC<IThemeProviderProps> = ({ children, initialTheme }) => {
    const [theme, setTheme] = useState(initialTheme)

    useEffect(() => {
        document.body.className = initialTheme
    }, [initialTheme])

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme, setTheme],
    )

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
