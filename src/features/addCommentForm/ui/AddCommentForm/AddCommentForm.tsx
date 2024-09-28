import React, { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'

import styles from './AddCommentForm.module.scss'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { DynamicModuleLoader } from '@shared/components/DynamicModuleLoader/DynamicModuleLoader'
import { Input } from '@shared/ui/Input/Input'
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/AddCommentFormSlice'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { Button } from '@shared/ui/Button/Button'

const reducers = {
    addCommentForm: addCommentFormReducer,
}

export interface IAddCommentFormProps {
    className?: string;
    isLoading: boolean
    onSendComment: (text: string) => void;
}

const AddCommentForm: FC<IAddCommentFormProps> =
    memo(function AddCommentForm(props) {
        const {
            className,
            isLoading,
            onSendComment,
        } = props

        const { t } = useTranslation()
        const dispatch = useAppDispatch()

        const {
            text
        } = useAppSelector(s => s.addCommentForm) || {}

        const onCommentTextChange = useCallback((value: string) => {
            dispatch(addCommentFormActions.setText(value))
        }, [dispatch])

        const onSendHandler = useCallback(() => {
            onSendComment(text || '')
            onCommentTextChange('')
        }, [onCommentTextChange, onSendComment, text])

        return (
            <DynamicModuleLoader reducers={reducers}>
                <div className={cn(styles.wrapper, className)}>
                    <Input
                        classNameWrapper={styles.input}
                        placeholder={t('Введите текст комментария')}
                        value={text}
                        onChange={(e) => onCommentTextChange(e.target.value)}
                    />
                    <Button
                        isLoading={isLoading}
                        variant='transparent'
                        onClick={onSendHandler}
                    >
                        {t('Отправить')}
                    </Button>
                </div>
            </DynamicModuleLoader>
        )
    })

export default AddCommentForm

// Example usage:
