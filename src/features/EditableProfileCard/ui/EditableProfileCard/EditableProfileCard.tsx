/* eslint-disable react/jsx-indent-props */

import { memo, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { ProfileCard } from '@entities/profile'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { Loader } from '@shared/ui/Loader/Loader'
import { showNotification } from '@shared/ui/Notification'
import { Flex } from '@shared/ui/Stack/Flex/Flex'

import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { DynamicModuleLoader } from '@shared/components/DynamicModuleLoader/DynamicModuleLoader'

import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { editProfileActions, editProfileReducer } from '../../model/slice/profileSlice'
import { ValidateProfileError } from '../../model/const/const'
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

    const { t } = useTranslation("profile")
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

    useEffect(() => {
        const validateErrorTranslates: Record<ValidateProfileError, string> = {
            [ValidateProfileError.SERVER_ERROR]: t('profileCard.errors.formEdit.server'),
            [ValidateProfileError.NO_DATA]: t('profileCard.errors.formEdit.noData'),
            [ValidateProfileError.INCORRECT_CITY]: t('profileCard.errors.formEdit.city'),
            [ValidateProfileError.INCORRECT_USER_DATA]: t('profileCard.errors.formEdit.userData'),
            [ValidateProfileError.INCORRECT_AGE]: t('profileCard.errors.formEdit.age'),
        }

        validateErrors?.map(err =>
            showNotification({ variant: "error", text: validateErrorTranslates[err] })
        )
    }, [t, validateErrors])

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
                    isLoading
                        ? <Flex direction='row' justify='center'>
                            <Loader />
                        </Flex>
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