import { ChangeEvent, HTMLAttributes, useMemo } from 'react'

import cn from '@shared/lib/classNames/classNames'
import styles from './Select.module.scss'

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

type BaseProps = Omit<HTMLAttributes<HTMLSelectElement>, "onChange" | "options" | "value">

interface SelectProps<T extends string> extends BaseProps {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: string | SelectOption<T>;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
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
            onChange(e.target.value as T)
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
}
