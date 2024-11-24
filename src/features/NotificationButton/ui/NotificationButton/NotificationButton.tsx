import React, { memo, useCallback, useState } from 'react'
import { isDesktop } from 'react-device-detect'

import cn from '@shared/lib/classNames/classNames'
import { NotificationList } from '@entities/Notification'
import { Drawer } from '@shared/ui/Drawer'
import { Icon } from '@shared/ui/Icon/Icon'
import { Popover } from '@shared/ui/Popups'

import styles from './NotificationButton.module.scss'

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props
    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    if (isDesktop) {
        return (
            <Popover
                classNameWrapper={cn(styles.wrapper, className)}
                classNamePanel={styles.panel}
                direction="bottom left"
                trigger={<Icon id="Notification_2" clickable onClick={onOpenDrawer} />}
            >
                <NotificationList className={styles.notifications} />
            </Popover>
        )
    }

    return (
        <>
            <Icon id="Notification_2" clickable onClick={onOpenDrawer} />
            <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                <NotificationList />
            </Drawer>
        </>
    )
})
