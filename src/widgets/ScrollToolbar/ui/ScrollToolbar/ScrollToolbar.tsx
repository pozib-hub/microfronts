import { memo } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { VStack } from '@shared/ui/Stack'
import { ScrollToTopButton } from '@features/scrollToTopButton'

import styles from './ScrollToolbar.module.scss'

interface ScrollToolbarProps {
    className?: string
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
    const { className } = props

    return (
        <VStack
            fullHeight
            fullWidth
            justify="center"
            align="center"
            className={cn(styles.wrapper, className)}
        >
            <ScrollToTopButton />
        </VStack>
    )
})
