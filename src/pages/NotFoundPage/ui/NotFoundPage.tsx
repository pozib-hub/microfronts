import React from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import styles from './NotFoundPage.module.scss'

interface INotFoundPage {
    className?: string
}

const NotFoundPage = (props: INotFoundPage) => {
    const { className } = props

    const { t } = useTranslation()

    return <div className={cn(styles.page, className)}>{t('notFoundPage')}</div>
}

export default NotFoundPage
