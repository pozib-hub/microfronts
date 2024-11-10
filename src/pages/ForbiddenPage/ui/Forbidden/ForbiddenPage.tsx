
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import { Text } from '@shared/ui/Text/Text'

import styles from './ForbiddenPage.module.scss'

interface IForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: IForbiddenPageProps) => {
    const { className } = props
    const { t } = useTranslation("pages")

    return (
        <div data-testId="ForbiddenPage" className={cn(styles.wrapper, className)}>
            <Text variant='h1'>
                {t("forbidden.title")}
            </Text>
            <Text variant='h4'>
                {t("forbidden.subtitle")}
            </Text>
        </div>
    )
})

export default ForbiddenPage