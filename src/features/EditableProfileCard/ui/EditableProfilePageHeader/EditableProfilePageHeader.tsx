import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

import cn from '@shared/lib/classNames/classNames'
import { Button } from '@shared/ui/Button/Button'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@shared/lib/hooks/useAppSelector'
import { Flex } from '@shared/ui/Stack/Flex/Flex'
import { Skeleton } from '@shared/ui/Skeleton'
import { Text } from '@shared/ui/Text'
import { Card } from '@shared/ui/Card'
import { HStack } from '@shared/ui/Stack'

import { editProfileActions } from '../../model/slice/profileSlice'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'

import styles from './EditableProfilePageHeader.module.scss'

interface EditableProfilePageHeaderProps {
    className?: string
}

export const EditableProfilePageHeader = (props: EditableProfilePageHeaderProps) => {
    const { className } = props

    const { t } = useTranslation(['translation', 'pages'])

    // const readonly = useSelector(getProfileReadonly)
    const { readonly, data, isLoading } = useAppSelector((state) => state.editProfile) || {}
    const { id: currentUserId } = useAppSelector((state) => state.user.authData) || {}
    const dispatch = useAppDispatch()

    const onEdit = useCallback(() => {
        dispatch(editProfileActions.setReadonly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
        dispatch(editProfileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
        dispatch(updateProfileData(data?.id || ''))
    }, [dispatch, data])

    const isEditProfile = currentUserId == data?.id

    if (isLoading) {
        return (
            <Card fullWidth border="partial" className={cn(styles.wrapper, className)}>
                <Flex fullWidth direction="row" align="center" justify="between">
                    <Text size="l">{t('pageProfile.header', { ns: 'pages' })}</Text>
                    <Skeleton width={'150px'} height={'40px'} border="48px" />
                </Flex>
            </Card>
        )
    }

    return (
        <Card fullWidth border="partial" className={cn(styles.wrapper, className)}>
            <Flex fullWidth direction="row" align="center" justify="between">
                <Text size="l">{t('pageProfile.header', { ns: 'pages' })}</Text>

                {isEditProfile && (
                    <>
                        {readonly ? (
                            <Button
                                data-testid="EditableProfileCardHeader.EditButton"
                                className={styles.editBtn}
                                variant="filled"
                                onClick={onEdit}
                            >
                                {t('edit')}
                            </Button>
                        ) : (
                            <HStack gap={4}>
                                <Button
                                    data-testid="EditableProfileCardHeader.CancelButton"
                                    className={styles.editBtn}
                                    variant="outline"
                                    color="error"
                                    onClick={onCancelEdit}
                                >
                                    {t('cancel')}
                                </Button>
                                <Button
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                    className={styles.saveBtn}
                                    variant="filled"
                                    onClick={onSave}
                                >
                                    {t('save')}
                                </Button>
                            </HStack>
                        )}
                    </>
                )}
            </Flex>
        </Card>
    )
}
