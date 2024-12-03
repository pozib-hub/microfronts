import React from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import { Text } from '@shared/ui/Text'
import { AppLink } from '@shared/ui/AppLink'
import { routePath } from '@shared/const/router'
import { Flex } from '@shared/ui/Stack/Flex/Flex'

import styles from './NotFoundPage.module.scss'
interface INotFoundPage {
    className?: string
}

const NotFoundPage = (props: INotFoundPage) => {
    const { className } = props

    const { t } = useTranslation('pages')

    return (
        <div data-testid="NotFoundPage" className={cn(styles.wrapper, className)}>
            <Text variant="primary" bold size="l">
                {t('notFound.title')}
            </Text>
            <Flex direction="row" gap={2}>
                <Text>{t('notFound.subtitle')}</Text>
                <AppLink to={routePath.main} className={styles.link}>
                    {t('notFound.btnRedirect')}
                </AppLink>
            </Flex>
        </div>
    )
}

export default NotFoundPage
