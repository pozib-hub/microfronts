/* eslint-disable react/jsx-indent-props */

import { memo, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import cn from 'src/shared/lib/classNames/classNames'
import { ProfileCard } from 'entities/profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Loader } from 'shared/ui/Loader/Loader'
import { Text } from 'shared/ui/Text/Text'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector'
import { DynamicModuleLoader } from 'shared/components/DynamicModuleLoader/DynamicModuleLoader'

import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { editProfileActions, editProfileReducer } from '../../model/slice/profileSlice'
import { ValidateProfileError } from '../../model/types/editableProfileCard'
import { EditableProfilePageHeader } from '../EditableProfilePageHeader/EditableProfilePageHeader'

import styles from './EditableProfileCard.module.scss'

const reducers = {
    editProfile: editProfileReducer
}

interface IEditableProfileCardProps {
    className?: string;
    id?: string
}

export const EditableProfileCard = memo((props: IEditableProfileCardProps) => {
    const { className, id } = props

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const location = useLocation()
    const { id: myUserId } = useAppSelector(s => s.user.authData) || {}

    const profile = useAppSelector(s => s.editProfile)

    const {
        isLoading,
        readonly,
        error,
        form,
        validateErrors,
    } = profile || {}

    const validateErrorTranslates: Record<ValidateProfileError, string> = {
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.INCORRECT_CITY]: t('Некорректный регион'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    }

    useEffect(() => {

        return () => {
            location.state = null
        }
    }, [location])

    useEffect(() => {
        if (id || myUserId) {
            dispatch(fetchProfileData({ id: id || myUserId }))
        }

        return () => {
            dispatch(editProfileActions.clearData())
        }
    }, [dispatch, id, myUserId])

    const onChangeFirstname = useCallback((value: string) => {
        dispatch(editProfileActions.updateProfile({ firstname: value || '' }))
    }, [dispatch])

    const onChangeLastname = useCallback((value: string) => {
        dispatch(editProfileActions.updateProfile({ lastname: value || '' }))
    }, [dispatch])

    const onChangeCity = useCallback((value: string) => {
        dispatch(editProfileActions.updateProfile({ address: { city: value || '' } }))
    }, [dispatch])

    const onChangeAge = useCallback((value?: number) => {
        dispatch(editProfileActions.updateProfile({ age: value }))
    }, [dispatch])

    const onChangeUsername = useCallback((value: string) => {
        dispatch(editProfileActions.updateProfile({ username: value || '' }))
    }, [dispatch])

    const onChangeAvatar = useCallback((value: string) => {
        dispatch(editProfileActions.updateProfile({ avatar: value || '' }))
    }, [dispatch])

    return (
        <div data-testid="EditableProfileCard" className={cn(styles.wrapper, className)}>
            <DynamicModuleLoader reducers={reducers}>
                <EditableProfilePageHeader />

                {
                    validateErrors?.map(err =>
                        <Text data-testid="EditableProfileCard.Error" key={err} color='red' >
                            {validateErrorTranslates[err]}
                        </Text>
                    )
                }
                {
                    isLoading
                        ? <Loader />
                        : <ProfileCard
                            isLoading={isLoading}
                            readonly={readonly}
                            data={form}
                            error={error}
                            onChangeFirstname={onChangeFirstname}
                            onChangeLastname={onChangeLastname}
                            onChangeAge={onChangeAge}
                            onChangeCity={onChangeCity}
                            onChangeUsername={onChangeUsername}
                            onChangeAvatar={onChangeAvatar}
                        />
                }
            </DynamicModuleLoader>
        </div>
    )
})