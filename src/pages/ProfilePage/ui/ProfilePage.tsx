/* eslint-disable react/jsx-indent-props */
import React, { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'


// TODO
import styles from './ProfilePage.module.scss'
import cn from 'src/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList
} from 'shared/components/DynamicModuleLoader/DynamicModuleLoader'
import { fetchProfileData, profileActions, ProfileCard, profileReducer } from 'entities/profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Loader } from 'shared/ui/Loader/Loader'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector'
import { globalSettingsActions } from 'entities/globalSettings'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'

const reducers: ReducersList = {
    profile: profileReducer
}

interface IProfilePage {
    className?: string
}

const ProfilePage: FC<IProfilePage> = (props) => {
    const { className } = props

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const profile = useAppSelector(s => s.profile)

    const { isLoading, readonly, error, form } = profile || {}

    useEffect(() => {
        // dispatch(globalSettingsActions.setLoaderPage(true))

        dispatch(fetchProfileData({}))
        // .finally(() => dispatch(globalSettingsActions.setLoaderPage(false)))

        return () => {
            dispatch(profileActions.clearData())
        }
    }, [dispatch])

    const onChangeFirstname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ firstname: value || '' }))
    }, [dispatch])

    const onChangeLastname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }))
    }, [dispatch])

    const onChangeCity = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ address: { city: value || '' } }))
    }, [dispatch])

    const onChangeAge = useCallback((value?: number) => {
        dispatch(profileActions.updateProfile({ age: value }))
    }, [dispatch])

    const onChangeUsername = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }))
    }, [dispatch])

    const onChangeAvatar = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }))
    }, [dispatch])

    return <DynamicModuleLoader reducers={reducers} shouldAfterUnmount={true}>
        <div className={cn(styles.page, className)}>
            <ProfilePageHeader />
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
        </div>
    </DynamicModuleLoader>
}

export default ProfilePage
