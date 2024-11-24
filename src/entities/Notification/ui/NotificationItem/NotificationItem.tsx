import { memo } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Card } from '@shared/ui/Card'
import { AppLink } from '@shared/ui/AppLink'

import { INotification } from '../../model/types/Notification'

import styles from './NotificationItem.module.scss'

interface INotificationItemProps {
    className?: string
    item: INotification
}

export const NotificationItem = memo((props: INotificationItemProps) => {
    const { className, item } = props

    if (item.href) {
        return (
            <AppLink className={cn(styles.wrapper, className)} to={item.href} target="_blank">
                <Card className={cn(styles.wrapper, className)}>
                    <h5>{item.title}</h5>
                    <span>{item.description}</span>
                </Card>
            </AppLink>
        )
    }

    return (
        <Card className={cn(styles.wrapper, className)}>
            <h5>{item.title}</h5>
            <span>{item.description}</span>
        </Card>
    )
})
