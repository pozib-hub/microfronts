import { Text } from 'shared/ui/Text/Text'
import { Button } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import styles from './ProfilePageHeader.module.scss'
import cn from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { profileActions } from 'entities/profile'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector'
import {
    updateProfileData
} from 'entities/profile/model/services/updateProfileData/updateProfileData'

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const {
        className,
    } = props

    const { t } = useTranslation('profile')

    // const readonly = useSelector(getProfileReadonly)
    const { readonly, data } = useAppSelector(state => state.profile) || {}
    const { id: currentUserId } = useAppSelector(state => state.user.authData) || {}
    const dispatch = useAppDispatch()

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
        dispatch(updateProfileData(data?.id || ""))
    }, [dispatch, data])

    const isEditProfile = currentUserId == data?.id

    return (
        <div className={cn(styles.ProfilePageHeader, className)}>
            <Text title={t('Профиль')} />

            {isEditProfile && <>
                {readonly
                    ? (
                        <Button
                            className={styles.editBtn}
                            variant='dashed'
                            onClick={onEdit}
                        >
                            {t('Редактировать')}
                        </Button>
                    )
                    : (
                        <>
                            <Button
                                className={styles.editBtn}
                                variant='primary'
                                onClick={onCancelEdit}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                className={styles.saveBtn}
                                variant='primary'
                                onClick={onSave}
                            >
                                {t('Сохранить')}
                            </Button>
                        </>
                    )}

            </>}

        </div>
    )
}
