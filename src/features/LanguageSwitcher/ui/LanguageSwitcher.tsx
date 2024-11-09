import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { Button } from '@shared/ui/Button/Button'

import styles from './LanguageSwitcher.module.scss'

interface ILanguageSwitcherProps {
    className?: string;
}

export const LanguageSwitcher: FC<ILanguageSwitcherProps> = (props) => {
    const { className } = props
    const { i18n } = useTranslation()

    const currentLanguage = i18n.language

    const invertLang = currentLanguage === 'ru' ? 'en' : 'ru'

    const toggle = () => {
        i18n.changeLanguage(invertLang)
    }

    return (
        <div className={cn(styles.languageSwitcher, className)}>
            <Button clearPadding variant='transparent' color='primary' onClick={toggle}>
                {invertLang}
            </Button>
        </div>
    )
}
