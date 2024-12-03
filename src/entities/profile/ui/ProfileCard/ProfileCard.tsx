import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import cn from '@shared/lib/classNames/classNames'
import { Text } from '@shared/ui/Text'
import { Input } from '@shared/ui/Input'
import { Avatar } from '@shared/ui/Avatar'
import { HStack, VStack } from '@shared/ui/Stack'
import { Card } from '@shared/ui/Card'
import { Skeleton } from '@shared/ui/Skeleton'

import { IProfile } from '../../model/types/profile'

import styles from './ProfileCard.module.scss'

export interface IProfileCardProps {
    className?: string
    data?: IProfile
    isLoading?: boolean
    error?: string
    readonly?: boolean
    onChangeLastname: (value: string) => void
    onChangeFirstname: (value: string) => void
    onChangeCity: (value: string) => void
    onChangeAge: (value?: number) => void
    onChangeUsername: (value: string) => void
    onChangeAvatar: (value: string) => void
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

    const { t } = useTranslation('profile')

    if (isLoading) {
        return (
            <Card fullWidth className={className} padding={6}>
                <VStack gap={8}>
                    <HStack fullWidth justify="center">
                        <Skeleton border="100%" width={128} height={128} />
                    </HStack>
                    <HStack gap={8} fullWidth>
                        <VStack gap={4} fullWidth>
                            <Skeleton width="100%" height={38} border="48px" />
                            <Skeleton width="100%" height={38} border="48px" />
                            <Skeleton width="100%" height={38} border="48px" />
                            <Skeleton width="100%" height={38} border="48px" />
                        </VStack>

                        <VStack gap={4} fullWidth>
                            <Skeleton width="100%" height={38} border="48px" />
                            <Skeleton width="100%" height={38} border="48px" />
                            <Skeleton width="100%" height={38} border="48px" />
                            <Skeleton width="100%" height={38} border="48px" />
                        </VStack>
                    </HStack>
                </VStack>
            </Card>
        )
    }

    if (error) {
        return (
            <HStack justify="center" fullWidth>
                <Text variant="error" title={t('profileCard.errors.loadProfile')} align="center">
                    {t('profileCard.errors.solutionError')}
                </Text>
            </HStack>
        )
    }

    return (
        <Card className={className} fullWidth padding={6} border="partial">
            <VStack gap={8}>
                {data?.avatar && (
                    <HStack justify="center" fullWidth>
                        <Avatar size={128} src={data?.avatar} />
                    </HStack>
                )}
                <HStack gap={4} fullWidth>
                    <VStack gap={4} fullWidth>
                        <Input
                            value={data?.firstname}
                            label={t('profileCard.inputs.firstname')}
                            onChange={(e) => onChangeFirstname(e.target.value)}
                            readonly={readonly}
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            value={data?.lastname}
                            label={t('profileCard.inputs.lastname')}
                            onChange={(e) => onChangeLastname(e.target.value)}
                            readonly={readonly}
                            data-testid="ProfileCard.lastname"
                        />
                        {/* <Input
                            value={data?.age}
                            label={{t("profileCard.inputs.firstname") t('Возраст')}
                            onChange={onChangeAge}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.city}
                            label={{t("profileCard.inputs.firstname") t('Город')}
                            onChange={onChangeCity}
                            readonly={readonly}
                        /> */}
                    </VStack>
                    <VStack gap={4} fullWidth>
                        <Input
                            value={data?.username}
                            label={t('profileCard.inputs.username')}
                            onChange={(e) => onChangeUsername(e.target.value)}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.avatar}
                            label={t('profileCard.inputs.avatar')}
                            onChange={(e) => onChangeAvatar(e.target.value)}
                            readonly={readonly}
                        />
                        {/* <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readonly={readonly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readonly={readonly}
                        /> */}
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    )
}
