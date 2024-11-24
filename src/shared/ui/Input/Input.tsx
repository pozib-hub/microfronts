import React, { InputHTMLAttributes, memo, ReactNode, useEffect, useRef, useState } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { HStack } from '../Stack'
import { Text } from '../Text'

import styles from './Input.module.scss'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>

type InputSize = 's' | 'm' | 'l'

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string | number
    label?: string
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
    autofocus?: boolean
    readonly?: boolean
    addonLeft?: ReactNode
    addonRight?: ReactNode
    size?: InputSize
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        label,
        size = 'm',
        ...otherProps
    } = props
    const ref = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true)
            ref.current?.focus()
        }
    }, [autofocus])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    const mods = {
        [styles.readonly]: readonly,
        [styles.focused]: isFocused,
        [styles.withAddonLeft]: Boolean(addonLeft),
        [styles.withAddonRight]: Boolean(addonRight),
    }

    const input = (
        <div className={cn(styles.InputWrapper, mods, className, styles[size])}>
            <div className={styles.addonLeft}>{addonLeft}</div>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={styles.input}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readonly}
                placeholder={placeholder}
                {...otherProps}
            />
            <div className={styles.addonRight}>{addonRight}</div>
        </div>
    )

    if (label) {
        return (
            <HStack fullWidth gap={2}>
                <Text>{label}</Text>
                {input}
            </HStack>
        )
    }

    return input
})
