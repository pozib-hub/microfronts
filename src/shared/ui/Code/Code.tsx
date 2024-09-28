import React, { FC, memo } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Button } from '../Button/Button'

import styles from './Code.module.scss'

interface ICodeProps {
    className?: string,
    children: string,
}
export const Code: FC<ICodeProps> =
    memo(function Code(props) {
        const {
            className,
            children,
        } = props

        const onCopy = () => {
            navigator.clipboard.writeText(children)
        }

        return (
            <pre className={cn(styles.wrapper, className)}>
                <Button
                    className={styles.btn_copy}
                    variant='dashed'
                    onClick={onCopy}
                >
                    Копировать
                </Button>
                <code  >
                    {children}
                </code >
            </pre>
        )
    })

