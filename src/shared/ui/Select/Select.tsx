import { ChangeEvent, HTMLAttributes, memo, useMemo } from 'react'

import cn from '@shared/lib/classNames/classNames'
import styles from './Select.module.scss'

export interface SelectOption {
    value: string;
    content: string;
}

type BaseProps = Omit<HTMLAttributes<HTMLSelectElement>, "onChange" | "options" | "value">

interface SelectProps extends BaseProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string | SelectOption;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Select = memo(function Select(props: SelectProps) {
    const {
        className,
        label,
        options,
        onChange,
        value,
        readonly,
        ...selectProps
    } = props

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value)
        }
    }

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            className={styles.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options])


    return (
        <div className={cn(styles.Wrapper, className)}>
            {label && (
                <span className={styles.label}>
                    {`${label}>`}
                </span>
            )}
            <select
                {...selectProps}
                disabled={readonly}
                className={styles.select}
                value={typeof value === "string" ? value : value?.value}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    )
})
