import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Text } from '@shared/ui/Text/Text'
import { Button } from '@shared/ui/Button/Button'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { Flex } from '@shared/ui/Stack/Flex/Flex'

import { editProfileActions } from '../../model/slice/profileSlice'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'

import styles from './EditableProfilePageHeader.module.scss'

interface EditableProfilePageHeaderProps {
    className?: string;
}

export const EditableProfilePageHeader = (props: EditableProfilePageHeaderProps) => {
    const {
        className,
    } = props

    const { t } = useTranslation()

    // const readonly = useSelector(getProfileReadonly)
    const { readonly, data } = useAppSelector(state => state.editProfile) || {}
    const { id: currentUserId } = useAppSelector(state => state.user.authData) || {}
    const dispatch = useAppDispatch()

    const onEdit = useCallback(() => {
        dispatch(editProfileActions.setReadonly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
        dispatch(editProfileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
        dispatch(updateProfileData(data?.id || ""))
    }, [dispatch, data])

    const isEditProfile = currentUserId == data?.id

    return (
        <div className={cn(styles.wrapper, className)}>
            <Flex max direction='row' align='center' justify='between'>

                <Text variant='h3'>
                    {t('profile')}
                </Text>

                {isEditProfile && <>
                    {readonly
                        ? (
                            <Button
                                data-testid="EditableProfileCardHeader.EditButton"
                                className={styles.editBtn}
                                variant='dashed'
                                onClick={onEdit}
                            >
                                {t('edit')}
                            </Button>
                        )
                        : (
                            <>
                                <Button
                                    data-testid="EditableProfileCardHeader.CancelButton"
                                    className={styles.editBtn}
                                    variant='primary'
                                    onClick={onCancelEdit}
                                >
                                    {t('cancel')}
                                </Button>
                                <Button
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                    className={styles.saveBtn}
                                    variant='primary'
                                    onClick={onSave}
                                >
                                    {t('save')}
                                </Button>
                            </>
                        )}

                </>}
            </Flex>
        </div>
    )
}
