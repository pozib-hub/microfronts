import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'shared/lib/classNames/classNames'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector'
import { Button } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import { Loader } from 'shared/ui/Loader/Loader'

import { IProfile } from '../../model/types/profile'
import styles from './ProfileCard.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { Avatar } from 'shared/ui/Avatar/Avatar'

interface IProfileCardProps {
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

    const { t } = useTranslation()

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
                <Text
                    // theme={TextTheme.ERROR}
                    variant='h1'
                    color='white'
                // title={t('Произошла ошибка при загрузке профиля')}
                // text={t('Попробуйте обновить страницу')}
                // align={TextAlign.CENTER}
                >
                    {t('Произошла ошибка при загрузке профиля')}
                </Text>
                <Text  >
                    {t('Попробуйте обновить страницу')}
                </Text>
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
                            classNameWrapper={styles.input}
                            readOnly={readonly}
                            label={t('Ваше имя')}
                            value={data?.firstname}
                            onChange={(e) => onChangeFirstname(e.target.value)}
                        />
                        <Input
                            classNameWrapper={styles.input}
                            readOnly={readonly}
                            label={t('Ваша фамилия')}
                            value={data?.lastname}
                            onChange={(e) => onChangeLastname(e.target.value)}
                        />
                        <Input
                            classNameWrapper={styles.input}
                            type='number'
                            readOnly={readonly}
                            label={t('Ваш возраст')}
                            value={data?.age}
                            onChange={(e) => onChangeAge(Number(e.target.value) || undefined)}
                        />
                    </div>

                    <div className={styles.row}>
                        <Input
                            classNameWrapper={styles.input}
                            readOnly={readonly}
                            label={t('Город')}
                            value={data?.address?.city}
                            onChange={(e) => onChangeCity(e.target.value)}
                        />
                        <Input
                            classNameWrapper={styles.input}
                            readOnly={readonly}
                            label={t('Введите имя пользователя')}
                            value={data?.username}
                            onChange={(e) => onChangeUsername(e.target.value)}
                        />
                        <Input
                            classNameWrapper={styles.input}
                            readOnly={readonly}
                            label={t('Введите ссылку на аватар')}
                            value={data?.avatar}
                            onChange={(e) => onChangeAvatar(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

