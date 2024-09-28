import React, { FC, memo } from 'react'

import cn from 'shared/lib/classNames/classNames'
import { Icon } from 'shared/ui/Icon/Icon'
import { Popover } from 'shared/ui/Popover/Popover'
import { NotificationList } from 'entities/Notification'
import { Button } from 'shared/ui/Button/Button'

import styles from './NotificationButton.module.scss'

interface INotificationButtonProps {
    className?: string
}
export const NotificationButton: FC<INotificationButtonProps> =
    memo(function NotificationButton(props) {
        const {
            className,
        } = props


        return (
            <div className={cn(styles.wrapper, className)}>
                <Popover
                    // className={styles.popover}
                    direction='bottom left'
                    trigger={
                        <Button variant='transparent'>
                            <Icon size={18} id='Notification' />
                        </Button>
                    }>
                    <NotificationList className={styles.notifications} />
                </Popover>
            </div>
        )
    })

