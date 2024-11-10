import React from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import styles from './MainPage.module.scss'

interface IMainPage {
    className?: string
}

const MainPage = (props: IMainPage) => {
    const { className } = props

    const { t } = useTranslation()

    return <div data-testId="MainPage" className={cn(styles.page, className)}>{t('Main')}</div>
}

export default MainPage
