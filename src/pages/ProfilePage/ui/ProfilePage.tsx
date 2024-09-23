/* eslint-disable react/jsx-indent-props */
import React, { FC, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'


// TODO
import styles from './ProfilePage.module.scss'
import cn from 'src/shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
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
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { routePath } from 'shared/config/routerConfig/routerConfig'

const reducers: ReducersList = {
    profile: profileReducer
}

interface IProfilePage {
    className?: string
}

const ProfilePage: FC<IProfilePage> = (props) => {
    const { className } = props

    const location = useLocation()
    const { id: paramsId } = useParams()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()


    const profile = useAppSelector(s => s.profile)
    const { id: myId } = useAppSelector(s => s.user.authData) || {}

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
        const id = paramsId || myId
        if (id) {
            dispatch(fetchProfileData({ id }))
        }

        return () => {
            dispatch(profileActions.clearData())
        }
    }, [dispatch, paramsId, myId])

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

    return <DynamicModuleLoader reducers={reducers}>
        <div className={cn(styles.page, className)}>
            {location.state?.article
                && <AppLink to={routePath.articles + location.state.article.id}>
                    {"<"}
                    {" "}
                    {location.state.article.title}
                </AppLink>}
            <ProfilePageHeader />
            {
                validateErrors?.map(err =>
                    <Text key={err} color='red' >
                        {t(err)}
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
        </div>
    </DynamicModuleLoader>
}

export default ProfilePage
