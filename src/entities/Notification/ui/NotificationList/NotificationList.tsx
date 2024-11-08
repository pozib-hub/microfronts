
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import { useNotifications } from '../../api/notificationApi'
import { NotificationItem } from '../NotificationItem/NotificationItem'

import styles from './NotificationList.module.scss'
import { Skeleton } from '@shared/ui/Skeleton/Skeleton'

interface INotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: INotificationListProps) => {
    const { className } = props
    const { t } = useTranslation()

    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 5000
    })

    if (isLoading) {
        return <div className={cn(styles.wrapper, className)}>
            <Skeleton width={"100%"} height={80} border='8px' />
            <Skeleton width={"100%"} height={80} border='8px' />
            <Skeleton width={"100%"} height={80} border='8px' />
            <Skeleton width={"100%"} height={80} border='8px' />
        </div>
    }

    return (
        <div className={cn(styles.wrapper, className)}>
            {
                data?.map((item) => <NotificationItem key={item.id} item={item} />)
            }
        </div>
    )
})