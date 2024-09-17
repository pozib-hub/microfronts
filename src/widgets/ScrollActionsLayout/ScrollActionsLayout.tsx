import React, { FC, memo, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import _ from 'lodash'

import cn from 'shared/lib/classNames/classNames'
import useInfiniteScroll from 'shared/lib/hooks/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector'
import { globalSettingsActions } from 'entities/globalSettings'
import { getScrollPage } from 'entities/globalSettings/model/selectors/getScrollPage'

import styles from './ScrollActionsLayout.module.scss'

interface ILayoutProps {
    className?: string
    isRestoringScroll?: boolean
    children: React.ReactNode,
    onScroll?: () => void
    isLoading?: boolean
}
export const ScrollActionsLayout: FC<ILayoutProps> =
    memo(function Layout(props) {
        const {
            className,
            children,
            onScroll,
            isLoading,
            isRestoringScroll = false,
        } = props

        const location = useLocation()
        const dispatch = useAppDispatch()
        const wrapperRef = useRef<HTMLElement | null>(null)
        const triggerRef = useRef<HTMLDivElement>(null)

        const scrollPosition = useAppSelector(getScrollPage(location.pathname))

        const debouncedHandleScroll = _.debounce((e: Event) => {
            const scrollLayout = e.target as HTMLElement

            // в момент перехода на другую страницу скролл исчезает и scrollTop становится 0
            // эта проверка обходит это
            const hasVerticalScroll = scrollLayout.scrollHeight > scrollLayout.clientHeight
            if (hasVerticalScroll) {
                dispatch(globalSettingsActions.setScrollPageRestore({
                    [location.pathname]: scrollLayout.scrollTop
                }))
            }

        }, 120)

        useEffect(() => {
            if (isRestoringScroll) {
                wrapperRef.current = document.getElementById("scroll-layout")
                wrapperRef.current?.addEventListener("scroll", debouncedHandleScroll)
            }

            return () => {
                wrapperRef.current?.removeEventListener("scroll", debouncedHandleScroll)
            }
        }, [debouncedHandleScroll, isRestoringScroll])

        useEffect(() => {
            if (wrapperRef.current && !isLoading) {
                wrapperRef.current.scrollTop = scrollPosition
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isLoading])

        useInfiniteScroll({
            wrapperRef,
            triggerRef,
            cb: onScroll,
        })

        return (
            <section
                className={cn(styles.wrapper, className)}
            >
                {children}
                {onScroll ? (
                    <div
                        ref={triggerRef}
                        className={styles.trigger}
                        style={isLoading ? { display: "none" } : {}}
                    />
                ) : null}
            </section>
        )
    })

