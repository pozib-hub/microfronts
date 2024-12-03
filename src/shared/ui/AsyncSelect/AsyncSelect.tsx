import React from 'react'
import { AsyncPaginate, AsyncPaginateProps } from 'react-select-async-paginate'
import { GroupBase } from 'react-select'

import cn from '@shared/lib/classNames/classNames'

import { InputContainer } from '../Input'

import styles from './AsyncSelect.module.scss'

type Variants = 'filled' | 'outline' | 'default'

interface AsyncSelectProps<
    OptionType,
    Group extends GroupBase<OptionType>,
    Additional,
    IsMulti extends boolean = false,
> extends AsyncPaginateProps<OptionType, Group, Additional, IsMulti> {
    label?: string
    isError?: boolean
    errorMessage?: boolean | string
    variant?: Variants
    width?: string | number
}

export function AsyncSelect<
    OptionType,
    Group extends GroupBase<OptionType>,
    Additional,
    IsMulti extends boolean = false,
>(props: AsyncSelectProps<OptionType, Group, Additional, IsMulti>) {
    const {
        className,
        label,
        isError,
        errorMessage,
        variant = 'default',
        width,
        placeholder,
        ...otherProps
    } = props

    return (
        <div className={cn(styles.wrapper, className)} style={{ width }}>
            <AsyncPaginate<OptionType, Group, Additional, IsMulti>
                {...otherProps}
                components={{
                    Control: ({ children, hasValue, isFocused }) => {
                        const value = hasValue || isFocused ? 'true' : undefined
                        return (
                            <InputContainer
                                label={label}
                                isError={isError}
                                errorMessage={errorMessage}
                                variant={variant}
                                value={value}
                            >
                                {children}
                            </InputContainer>
                        )
                    },
                }}
                placeholder={label ? '' : placeholder}
                styles={{
                    valueContainer: (base) => ({ ...base, padding: '0 8px' }),
                    dropdownIndicator: (base) => ({ ...base, padding: '6px 8px' }),
                }}
            />
        </div>
    )
}

export type { AsyncSelectProps }
