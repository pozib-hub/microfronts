import React, {
    useCallback, useEffect, useRef, FC,
} from 'react'

import cn from '@shared/lib/classNames/classNames'

// import { NewSuccessIcon } from 'cscore/src/icons/NewSuccessIcon'
// import { NewErrorIcon } from 'cscore/src/icons/NewErrorIcon'
// import { NewInfoIcon } from 'cscore/src/icons/NewInfoIcon'
// import { NewWarningIcon } from 'cscore/src/icons/NewWarningIcon'

import styles from './Notification.module.scss'

const titles = {
    info: 'Информационное сообщение',
    success: 'Выполнено!',
    warning: 'Внимание!',
    error: 'Ошибка!',
}

// const icon = {
//     success: <NewSuccessIcon />,
//     info: <NewInfoIcon />,
//     warning: <NewWarningIcon />,
//     error: <NewErrorIcon />,
// }

const icon = {
    success: <div />,
    info: <div />,
    warning: <div />,
    error: <div />,
}

export interface INotification {
    id?: string
    variant: 'success' | 'info' | 'warning' | 'error'
    text: string | string[]
    title?: string
    priority?: boolean
    timeOut?: number
    onClick?: () => void
    callback?: () => void
}

interface INotificationProps extends INotification {
    onRequestHide: () => void
}

const Notification: FC<INotificationProps> = (props) => {
    const {
        id,
        variant,
        text, title,
        priority,
        timeOut,
        onRequestHide,
        onClick,
        callback,
    } = props

    const timer = useRef<ReturnType<typeof setInterval> | null>(null)

    const handleClick = useCallback(() => {
        onClick?.()
        onRequestHide()
    }, [onClick, onRequestHide])

    const requestHide = useCallback(() => {
        onRequestHide()
        callback?.()
    }, [callback, onRequestHide])

    useEffect(() => {
        if (timeOut !== 0) {
            timer.current = setTimeout(requestHide, timeOut)
        }

        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
        }
    }, [id, requestHide, timeOut])

    return (
        <div role="presentation" className={styles.wrapper} onClick={handleClick}>
            <div className={cn(styles.content, styles[`variant--${variant}`])}>
                <div className={styles.icon}>{icon[variant]}</div>
                <div>
                    <div className={styles.title}>{title || titles[variant]}</div>
                    {Array.isArray(text) ? (
                        text.map((t) => <div key={t} className={styles.text}>{t}</div>)
                    ) : (
                        <div className={styles.text}>{text}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Notification
