
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'src/shared/lib/classNames/classNames'

import styles from './AdminPanelPage.module.scss'

interface IAdminPanelPageProps {
    className?: string;
}

export const AdminPanelPage = memo((props: IAdminPanelPageProps) => {
    const { className } = props
    const { t } = useTranslation()

    return (
        <div className={cn(styles.wrapper, className)}>
            Панель админа
        </div>
    )
})

export default AdminPanelPage