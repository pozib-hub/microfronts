import { useContext, useEffect } from 'react'

import { ThemeContext } from '../context/ThemeContext'
import { Theme } from '../../const/theme'
import { getUserSetting, saveUserSetting } from '@entities/UserSettings'
import { useAppDispatch } from './useAppDispatch'

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

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUserSetting({ key: 'theme' }))
    }, [dispatch])

    const toggleTheme = () => {
        const newTheme = getNextTheme(theme)
        dispatch(saveUserSetting({ key: 'theme', value: newTheme }))
        setTheme?.(newTheme)
    }

    return {
        theme,
        toggleTheme,
    }
}
