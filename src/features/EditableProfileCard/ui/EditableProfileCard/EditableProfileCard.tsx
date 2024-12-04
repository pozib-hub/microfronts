import { memo, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'

import cn from '@shared/lib/classNames/classNames'
import { IProfile, ProfileCard } from '@entities/profile'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { showNotification } from '@shared/ui/Notification'

import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { DynamicModuleLoader } from '@shared/components/DynamicModuleLoader/DynamicModuleLoader'

import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { editProfileActions, editProfileReducer } from '../../model/slice/profileSlice'
import { ValidateProfileError } from '../../model/const/const'
import { EditableProfilePageHeader } from '../EditableProfilePageHeader/EditableProfilePageHeader'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'

import styles from './EditableProfileCard.module.scss'

const reducers = {
    editProfile: editProfileReducer,
}

interface IEditableProfileCardProps {
    className?: string
    id?: string
}

export const EditableProfileCard = memo((props: IEditableProfileCardProps) => {
    const { className, id } = props

    const methods = useForm<IProfile>({
        defaultValues: {
            id: '',
            firstname: '',
            username: '',
            lastname: '',
            avatar: '',
            age: NaN,
            hobbies: [],
            subdivision: {},
            address: {},
        },
    })

    const { t } = useTranslation('profile')

    const dispatch = useAppDispatch()

    const location = useLocation()
    const { id: myUserId } = useAppSelector((s) => s.user.authData) || {}

    const profile = useAppSelector((s) => s.editProfile)

    const { isLoading, readonly, error, form, validateErrors } = profile || {}

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

        validateErrors?.map((err) =>
            showNotification({ variant: 'error', text: validateErrorTranslates[err] }),
        )
    }, [t, validateErrors])

    useEffect(() => {
        if (profile) {
            methods.reset(profile.data)
        }
    }, [methods, profile])

    const onSubmit = useCallback(
        (form: IProfile) => {
            dispatch(editProfileActions.updateProfile(form))
            dispatch(updateProfileData())
        },
        [dispatch],
    )

    return (
        <div data-testid="EditableProfileCard" className={cn(styles.wrapper, className)}>
            <DynamicModuleLoader reducers={reducers}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <EditableProfilePageHeader />

                        <ProfileCard
                            isLoading={isLoading}
                            readonly={readonly}
                            data={form}
                            error={error}
                            onSubmit={onSubmit}
                        />
                    </form>
                </FormProvider>
            </DynamicModuleLoader>
        </div>
    )
})
