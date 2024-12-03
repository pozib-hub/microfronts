import { memo } from 'react'

import cn from '@shared/lib/classNames/classNames'

import { Icon } from '@shared/ui/Icon/Icon'

import styles from './ScrollToTopButton.module.scss'

interface ScrollToTopButtonProps {
    className?: string
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props

    const onCLick = () => {
        const element = document.getElementById('scroll-layout') || window
        element.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <Icon
            className={cn(styles.wrapper, className)}
            id="CircleUp"
            clickable
            onClick={onCLick}
            size={32}
        />
    )
})
