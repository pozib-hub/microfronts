import React from 'react'

import { Loader } from '@shared/ui/Loader/Loader'

import cn from '@shared/lib/classNames/classNames'

import style from './PageLoader.module.scss'

interface IPageLoaderProps {
    className?: string;
}

export const PageLoader = (props: IPageLoaderProps) => {
    const { className } = props

    return (
        <div className={cn(style.pageLoader, className)}>
            <Loader />
        </div>
    )
}
