import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'src/shared/lib/classNames/classNames'
import { Button } from 'src/shared/ui/Button/Button'

import styles from './LanguageSwitcher.module.scss'

interface ILanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: FC<ILanguageSwitcherProps> = (props) => {
    const { className } = props
    const { t, i18n } = useTranslation()

    const currentLanguage = i18n.language

    const invertLang = currentLanguage === 'ru' ? 'en' : 'ru'

    const toggle = () => {
        i18n.changeLanguage(invertLang)
    }

    return (
        <div className={cn(styles.languageSwitcher, className)}>
            <Button onClick={toggle}>{invertLang}</Button>
        </div>
    )
}
