import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { Text } from '@shared/ui/Text/Text'
import { Loader } from '@shared/ui/Loader/Loader'
import { Flex } from '@shared/ui/Stack/Flex/Flex'

import { IProfile } from '../../model/types/profile'
import { Input } from '@shared/ui/Input/Input'
import { Avatar } from '@shared/ui/Avatar/Avatar'

import styles from './ProfileCard.module.scss'

export interface IProfileCardProps {
    className?: string
    data?: IProfile
    isLoading?: boolean
    error?: string
    readonly?: boolean,
    onChangeLastname: (value: string) => void;
    onChangeFirstname: (value: string) => void;
    onChangeCity: (value: string) => void;
    onChangeAge: (value?: number) => void;
    onChangeUsername: (value: string) => void;
    onChangeAvatar: (value: string) => void;
}
export const ProfileCard: FC<IProfileCardProps> = (props) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        // onChangeCountry,
        // onChangeCurrency,
    } = props

    const { t } = useTranslation("profile")

    if (isLoading) {
        return (
            <div
                className={cn(
                    styles.ProfileCard,
                    { [styles.loading]: isLoading },
                    className)}
            >
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <div className={cn(styles.ProfileCard, className, styles.error)}>
                <Flex direction='column' justify='center' gap='16'>
                    <Text
                        variant='h1'
                    >
                        {t('profileCard.errors.loadProfile')}
                    </Text>
                    <Text >
                        {t('profileCard.solutionError')}
                    </Text>
                </Flex>
            </div>
        )
    }


    return (
        <div
            className={cn(
                styles.ProfileCard,
                { [styles.editing]: !readonly },
                className)
            }
        >
            <div className={styles.data}>
                {data?.avatar && (
                    <div className={styles.avatarWrapper}>
                        <Avatar src={data?.avatar} />
                    </div>
                )}
                <div className={styles.col}>
                    <div className={styles.row}>
                        <Input
                            data-testid="ProfileCard.firstname"
                            classNameWrapper={styles.input}
                            readOnly={readonly}
                            label={t("profileCard.inputs.firstname")}
                            value={data?.firstname}
                            onChange={(e) => onChangeFirstname(e.target.value)}
                        />
                        <Input
                            data-testid="ProfileCard.lastname"
                            classNameWrapper={styles.input}
                            readOnly={readonly}
                            label={t("profileCard.inputs.lastname")}
                            value={data?.lastname}
                            onChange={(e) => onChangeLastname(e.target.value)}
                        />
                        <Input
                            data-testid="ProfileCard.age"
                            classNameWrapper={styles.input}
                            type='number'
                            readOnly={readonly}
                            label={t("profileCard.inputs.age")}
                            value={data?.age}
                            onChange={(e) => onChangeAge(Number(e.target.value) || undefined)}
                        />
                    </div>

                    <div className={styles.row}>
                        <Input
                            data-testid="ProfileCard.city"
                            classNameWrapper={styles.input}
                            readOnly={readonly}
                            label={t("profileCard.inputs.city")}
                            value={data?.address?.city}
                            onChange={(e) => onChangeCity(e.target.value)}
                        />
                        <Input
                            data-testid="ProfileCard.username"
                            classNameWrapper={styles.input}
                            readOnly={readonly}
                            label={t("profileCard.inputs.username")}
                            value={data?.username}
                            onChange={(e) => onChangeUsername(e.target.value)}
                        />
                        <Input
                            data-testid="ProfileCard.avatar"
                            classNameWrapper={styles.input}
                            readOnly={readonly}
                            label={t("profileCard.inputs.avatar")}
                            value={data?.avatar}
                            onChange={(e) => onChangeAvatar(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

