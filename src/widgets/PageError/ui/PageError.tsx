import React from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'src/shared/lib/classNames/classNames'
import { Button } from 'src/shared/ui/Button/Button'

import style from './PageError.module.scss'

interface IPageErrorProps {
  className?: string;
}

export const PageError = (props: IPageErrorProps) => {
    const { className } = props

    const { t } = useTranslation()

    const onReloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
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
