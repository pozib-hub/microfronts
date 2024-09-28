import React, {
    FC, InputHTMLAttributes,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react'

import cn from '@shared/lib/classNames/classNames'

import styles from './Input.module.scss'

type Variants = 'filled' | 'outline' | 'default'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: Variants
    classNameWrapper?: string
    label?: string
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    errorMessage?: string
    error?: boolean
    autoFocus?: boolean
}

export const Input: FC<IInputProps> = memo(function Input(props) {
    const {
        classNameWrapper,
        variant = 'default',
        type = 'text',
        label,
        iconLeft,
        iconRight,
        errorMessage,
        error,
        style,
        autoFocus,
        ...inputProps
    } = props

    const isLabelWithPlaceholder = Boolean(label) && Boolean(props.placeholder)

    const [isFocus, setFocus] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (autoFocus) {
            setFocus(true)
            ref.current?.focus()
        }
    }, [autoFocus])

    return (
        <div className={cn(styles.wrapper, classNameWrapper)} style={style}>
            <div className={cn(
                styles.container,
                {
                    [styles.error]: error,
                    [styles['variant-default']]: variant === 'default',
                    [styles['variant-outline']]: variant === 'outline',
                    [styles['variant-filled']]: variant === 'filled',
                    [styles['label-static']]: isLabelWithPlaceholder,
                },
            )}
            >
                <input
                    ref={ref}
                    type={type}
                    {...inputProps}
                    className={cn(
                        styles.input,
                        props.className,
                        { [styles['not-empty']]: Boolean(props.value) },
                    )}
                    style={{}}
                />
                {label && !props.hidden && (
                    <label
                        className={cn(styles.label)}
                    >
                        <span className={styles['label-text']}>{label}</span>
                        {props.required && <span className={styles['label-star-required']}>∗</span>}
                    </label>
                )}
                <fieldset
                    aria-hidden="true"
                    className={styles.fieldset}
                    style={iconLeft ? { padding: '0 32px' } : {}}
                >
                    <legend
                        className={styles.legend}
                        style={label ? undefined : { width: '0.01px' }}
                    >
                        <span className={styles['label-text']}>{label}</span>
                        {props.required && <span className={styles['label-required']}>∗</span>}
                    </legend>
                </fieldset>
                {iconRight && <div className={styles['icon-right']}>{iconRight}</div>}
                {iconLeft && <div className={styles['icon-left']}>{iconLeft}</div>}
            </div>
            {errorMessage && <span className="error-message" title={errorMessage} />}
        </div>
    )
})


// export interface IPropsInput {
// defaultValue?: string
// label?: string
// width?: string
// placeholder?: string
// value?: string | number
// onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
// onBlur?: ((event: React.FormEvent<HTMLInputElement>) => void) | undefined
// onFocus?: ((event: React.FormEvent<HTMLInputElement>) => void) | undefined
// onKeyDown?: ((event: React.KeyboardEvent<HTMLInputElement>) => void) | undefined
// type?: string
// isDisabled?: boolean
// isRequired?: boolean
// iconLeft?: React.ReactNode
// iconRight?: React.ReactNode
// className?: string
// margin?: string
// marginRight?: string
// error?: boolean
// isBorderDelete?: boolean
// autoFocus?: boolean
// id?: string
// hidden?: boolean
// accept?: string
// isGrayBackground?: boolean
// isGrayText?: boolean
// min?: string | number
// max?: string | number
// variant?: 'normal' | 'wide' | 'custom'
// isUnsignedIntegerOnly?: boolean
// rightContextForWide?: string | React.ReactNode
// rightContext?: string | React.ReactNode
// pattern?: string
// maxLength?: number
// errorMessage?: string
// disableWheel?: boolean
// step?: string
// successMessage?: string
// successIcon?: React.ReactNode
// }

// export const Input = forwardRef<HTMLInputElement, IPropsInput>((props, ref) => {
//     const {
//         min,
//         max,
//         label,
//         width,
//         placeholder,
//         value,
//         onChange,
//         onBlur,
//         onFocus,
//         onKeyDown,
//         type,
//         isDisabled,
//         isRequired = false,
//         iconLeft,
//         iconRight,
//         className,
//         margin,
//         error,
//         isBorderDelete,
//         marginRight,
//         autoFocus,
//         hidden,
//         id,
//         variant = 'normal',
//         isGrayBackground = false,
//         isGrayText = false,
//         accept,
//         isUnsignedIntegerOnly,
//         rightContextForWide,
//         rightContext,
//         pattern,
//         maxLength,
//         defaultValue,
//         errorMessage,
//         disableWheel = false,
//         step,
//         successMessage,
//         successIcon,
//     } = props

//     const inputEl = useRef<HTMLInputElement>(null)

//     const hdlOnChange = (event: any, onChange: any) => {
//         const mutatedValue = event.target.value.replace(/[^0-9]/g, '')
//         onChange({ ...event, target: { ...event.target, value: mutatedValue } })
//     }

//     useEffect(() => {
//         const inputElem = inputEl.current

//         const handleWheel = (e: any) => {
//             e.preventDefault()
//         }

//         if (disableWheel) {
//             inputElem?.addEventListener('wheel', handleWheel, { passive: false })
//         }

//         return () => {
//             inputElem?.removeEventListener('wheel', handleWheel)
//         }
//     }, [])

//     const labelWithPlaceholder = Boolean(label && placeholder)
//     const styleLabelText: CSSProperties = {}

//     const paddingIfExistIcon = iconLeft ? 40 : undefined

//     if (iconLeft) {
//         styleLabelText.left = '25px'
//         styleLabelText.maxWidth = `calc(100% - ${paddingIfExistIcon}px)`
//     }

//     if (iconLeft && iconRight && paddingIfExistIcon) {
//         styleLabelText.maxWidth = `calc(100% - ${paddingIfExistIcon * 2}px)`
//     }

//     return (
//         <div className={styles['input-container']} style={{ marginBottom: `${margin}`, marginRight: `${marginRight}`, width: `${width}` }}>
//             <div className={styles.input}>
//                 <input
//                     accept={accept}
//                     hidden={hidden}
//                     pattern={pattern}
//                     id={id}
//                     defaultValue={defaultValue}
//                     style={iconLeft && iconRight ? { paddingInline: paddingIfExistIcon } : { paddingLeft: paddingIfExistIcon }}
//                     className={classNames(
//                         styles.inputField,
//                         {
//                             [styles.inputField__error]: error,
//                             [styles['inputField-normal']]: variant === 'normal',
//                             [styles['inputField-wide']]: variant === 'wide',
//                             [styles['inputField-custom']]: variant === 'custom',
//                         },
//                         className,
//                         {
//                             [styles.inputField__withoutBorder]: isBorderDelete,
//                             [styles.inputField__gray]: isGrayBackground,
//                             [styles.inputField__gray_text]: isGrayText,
//                         },
//                     )}
//                     ref={mergeRefs([ref, inputEl])}
//                     onChange={isUnsignedIntegerOnly ? (e) => hdlOnChange(e, onChange) : onChange}
//                     onFocus={onFocus}
//                     onBlur={onBlur}
//                     onKeyDown={onKeyDown}
//                     type={type}
//                     step={step}
//                     disabled={isDisabled}
//                     required={isRequired}
//                     placeholder={placeholder || ' '}
//                     value={value}
//                     autoFocus={autoFocus}
//                     min={min}
//                     max={max}
//                     maxLength={maxLength}
//                 />
//                 {variant !== 'custom' && label && !hidden && (
//                     <label
//                         className={classNames(styles.input__label, {
//                             [styles['input__label-static']]: labelWithPlaceholder,
//                         })}
//                         style={styleLabelText}
//                     >
//                         <span className={styles['input__label-text']}>{label}</span>
//                         {isRequired && <span className={styles['input__label-required']}>∗</span>}
//                     </label>
//                 )}
//                 {variant !== 'custom' && !hidden && (
//                     <fieldset aria-hidden="true" className={styles.input__fieldset} style={iconLeft ? { padding: '0 32px' } : {}}>
//                         <legend className={styles.input__legend} style={label ? undefined : { width: '0.01px' }}>
//                             <span className={styles['input__label-text']}>{label}</span>
//                             {isRequired && <span className={styles['input__label-required']}>∗</span>}
//                         </legend>
//                     </fieldset>
//                 )}

//                 {variant === 'normal' && !hidden && (
//                     <>
//                         {!iconRight && rightContext && (
//                             <div className={classNames(styles['input-icon'], [styles['input-icon-right-context']])}>{rightContext}</div>
//                         )}
//                         {iconRight && <div className={classNames(styles['input-icon'], [styles['input-icon-right']])}>{iconRight}</div>}
//                         {iconLeft && <div className={classNames(styles['input-icon'], [styles['input-icon-left']])}>{iconLeft}</div>}
//                     </>
//                 )}
//                 {variant === 'wide' && !hidden && (
//                     <div className={classNames(styles['input-icon'], [styles['input-icon-right-wide']])}>{rightContextForWide}</div>
//                 )}
//             </div>
//             {errorMessage && <Text className="error" title={errorMessage} type="caption" color="error" />}
//             {successMessage
// && (
//     <div className={styles['input__success-message']}>
//         {successIcon && successIcon}
//         <Text className="success" title={successMessage} type="caption" color="secondaryDark" />
//     </div>
// )}
//         </div>
//     )
// })
