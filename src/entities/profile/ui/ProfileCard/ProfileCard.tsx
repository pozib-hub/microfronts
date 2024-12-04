import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, useFormContext } from 'react-hook-form'

import { Text } from '@shared/ui/Text'
import { Input } from '@shared/ui/Input'
import { Avatar } from '@shared/ui/Avatar'
import { HStack, VStack } from '@shared/ui/Stack'
import { Card } from '@shared/ui/Card'
import { Skeleton } from '@shared/ui/Skeleton'
import { SubdivisionSelect } from '@features/SubdivisionSelect'
import { AddressSubdivisionSelect } from '@features/AddressSubdivisionSelect'

import { IProfile } from '../../model/types/profile'

export interface IProfileCardProps {
    className?: string
    data?: IProfile
    isLoading?: boolean
    error?: string
    readonly?: boolean
    onSubmit: (form: IProfile) => void
}
export const ProfileCard: FC<IProfileCardProps> = (props) => {
    const { className, data, isLoading, error, readonly = true } = props

    const { t } = useTranslation('profile')

    const { control, watch, setValue } = useFormContext<IProfile>()

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
                    {t('profileCard.errors.solution')}
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
                <VStack gap={6} fullWidth>
                    <HStack gap={8} fullWidth justify="between">
                        <Controller
                            name="firstname"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field, fieldState }) => (
                                <Input
                                    {...field}
                                    data-testid="ProfileCard.firstname"
                                    required
                                    readonly={readonly}
                                    isError={Boolean(fieldState.error)}
                                    errorMessage={Boolean(fieldState.error)}
                                    width={'100%'}
                                    label={t('profileCard.inputs.firstname')}
                                    variant="outline"
                                />
                            )}
                        />
                        <Controller
                            name="lastname"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field, fieldState }) => (
                                <Input
                                    {...field}
                                    data-testid="ProfileCard.lastname"
                                    required
                                    readonly={readonly}
                                    isError={Boolean(fieldState.error)}
                                    errorMessage={Boolean(fieldState.error)}
                                    width={'100%'}
                                    label={t('profileCard.inputs.lastname')}
                                    variant="outline"
                                />
                            )}
                        />
                    </HStack>
                    <HStack gap={8} fullWidth justify="between">
                        <Controller
                            name="username"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field, fieldState }) => (
                                <Input
                                    {...field}
                                    data-testid="ProfileCard.username"
                                    required
                                    readonly={readonly}
                                    isError={Boolean(fieldState.error)}
                                    errorMessage={Boolean(fieldState.error)}
                                    width={'100%'}
                                    label={t('profileCard.inputs.username')}
                                    variant="outline"
                                />
                            )}
                        />
                        <Controller
                            name="avatar"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    data-testid="ProfileCard.avatar"
                                    readonly={readonly}
                                    width={'100%'}
                                    label={t('profileCard.inputs.avatar')}
                                    variant="outline"
                                />
                            )}
                        />
                    </HStack>
                    {readonly ? (
                        <HStack gap={8} fullWidth justify="between">
                            <Input
                                data-testid="ProfileCard.subdivision.name"
                                readonly={readonly}
                                width={'100%'}
                                label={t('profileCard.inputs.subdivision.name')}
                                value={data?.subdivision?.name}
                                variant="outline"
                            />
                            <Input
                                data-testid="ProfileCard.address.name"
                                readonly={readonly}
                                width={'100%'}
                                label={t('profileCard.inputs.address.name')}
                                value={data?.address?.name}
                                variant="outline"
                            />
                        </HStack>
                    ) : (
                        <HStack gap={8} fullWidth>
                            <Controller
                                name="subdivision"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field, fieldState }) => {
                                    return (
                                        <SubdivisionSelect
                                            data-testid="ProfileCard.subdivision"
                                            width="100%"
                                            label={t('profileCard.inputs.subdivision.name')}
                                            isError={Boolean(fieldState.error)}
                                            errorMessage={Boolean(fieldState.error)}
                                            value={field.value}
                                            onChange={(option) => {
                                                console.log(option)

                                                field.onChange({
                                                    id: option?.id,
                                                    name: option?.name,
                                                })
                                                setValue('address', null)
                                            }}
                                        />
                                    )
                                }}
                            />
                            <Controller
                                name="address"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field, fieldState }) => {
                                    return (
                                        <AddressSubdivisionSelect
                                            key={`subdivisionId:${watch('subdivision')?.id}`}
                                            data-testid="ProfileCard.address"
                                            width="100%"
                                            label={t('profileCard.inputs.address.name')}
                                            subdivisionId={watch('subdivision.id')}
                                            isError={Boolean(fieldState.error)}
                                            errorMessage={Boolean(fieldState.error)}
                                            value={field.value}
                                            onChange={(option) => {
                                                field.onChange({
                                                    id: option?.id,
                                                    name: option?.name,
                                                })
                                            }}
                                        />
                                    )
                                }}
                            />
                        </HStack>
                    )}
                </VStack>
            </VStack>
        </Card>
    )
}
