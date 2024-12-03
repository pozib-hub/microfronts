import React, { ErrorInfo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import cn from '@shared/lib/classNames/classNames'
import { Button } from '@shared/ui/Button'
import { routePath } from '@shared/const/router'
import { Section } from '@shared/ui/Section/Section'
import { HStack } from '@shared/ui/Stack'

import styles from './PageError.module.scss'

interface IPageErrorProps {
    className?: string
    error?: Error
    errorInfo?: ErrorInfo
}

export const PageError = (props: IPageErrorProps) => {
    const { className, error, errorInfo } = props

    const navigate = useNavigate()

    const { t } = useTranslation('pages')

    const onReloadPage = () => {
        location.reload()
    }

    const goToMainPage = () => {
        navigate(routePath.main)
        onReloadPage()
    }

    return (
        <div className={cn(styles.wrapper, className)}>
            <h2 className={styles.title}>{t('pageError.title')}</h2>
            <h4 className={styles.subtitle}>{t('pageError.subtitle')}</h4>
            <div className={styles.instructions}>
                <HStack>
                    {t('pageError.textReloadPage')}
                    &nbsp;
                    <Button className={styles.button} variant="clear" onClick={onReloadPage}>
                        {t('pageError.btnReloadPage')}
                    </Button>
                </HStack>
                <HStack>
                    {t('pageError.textGoMainPage')}
                    &nbsp;
                    <Button className={styles.button} variant="clear" onClick={goToMainPage}>
                        {t('pageError.btnGoMainPage')}
                    </Button>
                    .
                </HStack>
            </div>
            <div className={styles.error}>
                <br />
                {error && error.toString()}
            </div>
            <Section title={t('pageError.readMore')} defaultOpen={false} openByClickTitle>
                <div>{errorInfo?.componentStack}</div>
            </Section>
        </div>
    )
}
