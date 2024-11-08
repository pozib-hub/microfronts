import React from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import styles from './NotFoundPage.module.scss'
import { Text } from '@shared/ui/Text/Text'
import { Button } from '@shared/ui/Button/Button'
import { AppLink } from '@shared/ui/AppLink/AppLink'
import { routePath } from '@shared/const/router'
import { Flex } from '@shared/ui/Stack/Flex/Flex'

interface INotFoundPage {
    className?: string
}

const NotFoundPage = (props: INotFoundPage) => {
    const { className } = props

    const { t } = useTranslation("pages")

    return <div className={cn(styles.wrapper, className)}>
        <Text variant='h1'>{t('notFound.title')}</Text>
        <Flex direction='row' gap='8'>
            <Text>{t('notFound.subtitle')}</Text>
            <AppLink to={routePath.main} className={styles.link}>
                {t("notFound.btnRedirect")}
            </AppLink>
        </Flex>
    </div>
}

export default NotFoundPage
