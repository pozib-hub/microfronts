
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'src/shared/lib/classNames/classNames'

import styles from './ForbiddenPage.module.scss'

interface IForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: IForbiddenPageProps) => {
    const { className } = props
    const { t } = useTranslation()

    return (
        <div className={cn(styles.wrapper, className)}>
            У вас нет доступа
        </div>
    )
})

export default ForbiddenPage