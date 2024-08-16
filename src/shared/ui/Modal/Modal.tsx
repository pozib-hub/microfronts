import React, {
    FC, useCallback, useEffect, useRef,
    useState,
} from 'react'

import cn from 'shared/lib/classNames/classNames'
import { Portal } from '../Portal/Portal'

import style from './Modal.module.scss'

const DEFAULT_ANIMATION_DELAY = 300

type MousePosition = {
    x: number,
    y: number,
} | null

let mousePosition: MousePosition = null

const getClickPosition = (e: MouseEvent) => {
    mousePosition = {
        x: e.pageX,
        y: e.pageY,
    }
    setTimeout(() => {
        mousePosition = null
    }, 100)
}

document.documentElement.addEventListener('click', getClickPosition, true)

interface IModalProps {
    classNames?: {
        header?: string
        body?: string
        footer?: string
        overlay?: string
        content?: string
        wrapper?: string
    }
    // variant?: 'default' | 'medium' | 'full'
    animationDelay?: number
    isMobile?: boolean
    isOpen: boolean
    onClose: () => void
    children?: React.ReactNode
}

export const Modal: FC<IModalProps> = (props) => {
    const {
        classNames: classNamesProps = {},
        children,
        animationDelay,
        isMobile,
        isOpen,
        onClose,
    } = props

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>()
    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const handlerClose = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, animationDelay || DEFAULT_ANIMATION_DELAY)
        }
    }, [animationDelay, onClose])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            handlerClose()
        }
    }, [handlerClose])

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])

    useEffect(() => {
        setIsMounted(isOpen)
    }, [isOpen])

    const classes = [
        {
            [style.opened]: isOpen,
            [style.isClosing]: isClosing,
            [style.isMobile]: isMobile,
        },
        style.wrapper,
        classNamesProps.wrapper,
    ]

    if (!isMounted) {
        return null
    }

    return (
        <Portal>
            <div
                className={cn(classes)}
            >
                <div
                    role="presentation"
                    className={cn(style.overlay, classNamesProps.overlay)}
                    onClick={handlerClose}
                >
                    <div
                        role="presentation"
                        className={cn(style.body, classNamesProps.body)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
