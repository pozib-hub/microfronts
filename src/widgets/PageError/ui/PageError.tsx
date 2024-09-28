import React from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { Button } from '@shared/ui/Button/Button'

import style from './PageError.module.scss'

interface IPageErrorProps {
    className?: string;
}

export const PageError = (props: IPageErrorProps) => {
    const { className } = props

    const { t } = useTranslation()

    const onReloadPage = () => {

        location.reload()
    }

    return (
        <div className={cn(style.pageError, className)}>
            <p>
                {t('error')}
            </p>
            <Button onClick={onReloadPage}>
                {t('reloadPage')}
            </Button>
        </div>
    )
}
