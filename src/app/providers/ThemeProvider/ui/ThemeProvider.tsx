import React, { FC, useMemo, useEffect, useCallback } from 'react'

import { ThemeContext } from '@shared/lib/context/ThemeContext'
import { Theme } from '@shared/const/them'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { getUserSetting, saveUserSetting } from '@entities/UserSettings'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'

interface IThemeProviderProps {
    children?: React.ReactNode
    initialTheme?: Theme
}

const ThemeProvider: FC<IThemeProviderProps> = ({ children, initialTheme }) => {
    const dispatch = useAppDispatch()

    const theme = useAppSelector((state) => state.userSettings.theme)

    useEffect(() => {
        dispatch(getUserSetting({ key: 'theme' }))
    }, [dispatch])

    useEffect(() => {
        document.body.className = theme
    }, [theme])

    const setTheme = useCallback(
        (theme: Theme) => {
            dispatch(saveUserSetting({ key: 'theme', value: theme }))
        },
        [dispatch],
    )

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
