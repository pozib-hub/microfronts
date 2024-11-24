import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import { Text } from '@shared/ui/Text'

import styles from './ForbiddenPage.module.scss'

interface IForbiddenPageProps {
    className?: string
}

const ForbiddenPage = memo((props: IForbiddenPageProps) => {
    const { className } = props
    const { t } = useTranslation('pages')

    return (
        <div data-testid="ForbiddenPage" className={cn(styles.wrapper, className)}>
            <Text variant="primary">{t('forbidden.title')}</Text>
            <Text variant="error">{t('forbidden.subtitle')}</Text>
        </div>
    )
})

export default ForbiddenPage
