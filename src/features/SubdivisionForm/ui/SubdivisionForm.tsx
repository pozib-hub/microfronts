import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Input } from '@shared/ui/Input'
import { HStack, VStack } from '@shared/ui/Stack'
import { Button } from '@shared/ui/Button'
import { ISubdivision } from '@entities/Subdivision'
import { Text } from '@shared/ui/Text'
import { Icon } from '@shared/ui/Icon/Icon'
import { IAddress } from '@shared/types/common'
import { Select } from '@shared/ui/Select'
import { Delimiter } from '@shared/ui/Delimiter'

import styles from './SubdivisionForm.module.scss'

const getOptionsAddress = (data: IAddress[]) => {
    return data.map((a) => ({ id: a.id, name: a.name }))
}

interface IOptionAddress {
    id: string
    name: string
}

interface ISubdivisionFormProps {
    className?: string
    isLoadingData?: boolean
    isLoadingSubmit?: boolean
    action: 'create' | 'update'
    defaultData?: ISubdivision | null
    onSubmit: (form: ISubdivision) => void
    onCancel?: () => void
}

export const SubdivisionForm: FC<ISubdivisionFormProps> = memo(function SubdivisionForm(props) {
    const { className, isLoadingData, isLoadingSubmit, action, defaultData, onSubmit, onCancel } =
        props

    const isLoading = isLoadingData || isLoadingSubmit

    const [optionsAddresses, setOptionsAddresses] = useState<IOptionAddress[]>([])

    const { t } = useTranslation(['translation', 'subdivisions'])

    const { reset, control, handleSubmit, getValues, setValue } = useForm<ISubdivision>({
        defaultValues: {
            name: '',
            defaultAddressName: '',
            defaultAddressId: '',
            addresses: [],
        },
    })

    const {
        fields: addressFields,
        append,
        remove,
        insert,
    } = useFieldArray<ISubdivision>({
        name: 'addresses',
        control: control,
        rules: {
            required: true,
        },
    })

    useEffect(() => {
        if (action === 'update' && defaultData) {
            reset(defaultData)
            setOptionsAddresses(getOptionsAddress(defaultData.addresses))
        } else {
            setValue('addresses', [
                {
                    id: '1',
                    name: '',
                    workSchedule: {
                        finishBreak: '',
                        finishWork: '',
                        startBreak: '',
                        startWork: '',
                    },
                },
            ])
        }
    }, [action, defaultData, setValue, reset])

    // useEffect(() => {
    //     const { unsubscribe } = watch((values, { name, type }) => {
    //         if (name?.startsWith('addresses') && name.endsWith('name')) {
    //             // setOptionsAddresses(values.map((a) => ({ id: a.id, name: a.name })))
    //         }
    //     })

    //     return unsubscribe
    // }, [watch])

    const onOpenMenuAddresses = useCallback(() => {
        const addresses = getValues('addresses')

        const optionsAddresses = addresses
            ?.map((a) => ({ id: a?.id, name: a?.name }))
            .filter((a): a is IOptionAddress => Boolean(a.id && a.name))

        setOptionsAddresses(optionsAddresses || [])
    }, [getValues])

    const onAddAddressRow = useCallback(() => {
        const addresses = getValues('addresses')

        append({
            id: String(addresses.length + 1),
            name: '',
            workSchedule: {
                finishBreak: '',
                finishWork: '',
                startBreak: '',
                startWork: '',
            },
        })
    }, [append, getValues])

    const onDeleteAddressRow = (index: number) => {
        remove(index)
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4}>
                <Text bold>{t('form.mainTitle', { ns: 'subdivisions' })}</Text>
                <HStack gap={8}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field, fieldState }) => (
                            <Input
                                required
                                disabled={isLoading}
                                variant="outline"
                                label={t('form.inputs.name', { ns: 'subdivisions' })}
                                isError={Boolean(fieldState.error)}
                                errorMessage={Boolean(fieldState.error)}
                                {...field}
                            />
                        )}
                    />

                    <Controller
                        name="defaultAddressId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Select
                                isDisabled={isLoading}
                                variant="outline"
                                label={t('form.inputs.defaultAddress', { ns: 'subdivisions' })}
                                width={200}
                                getOptionLabel={(o) => o.name}
                                getOptionValue={(o) => o.id}
                                options={optionsAddresses}
                                onMenuOpen={onOpenMenuAddresses}
                                value={optionsAddresses.find((o) => o.id === field.value)}
                                onChange={(o) => field.onChange(o?.id)}
                            />
                        )}
                    />
                </HStack>
            </VStack>

            <Delimiter />

            <VStack fullWidth gap={4}>
                <Text bold>{t('form.addressTitle', { ns: 'subdivisions' })}</Text>
                <VStack gap={8}>
                    {addressFields.map((address, index) => {
                        return (
                            <VStack key={address.id} gap={3}>
                                {t('form.countAddress', { count: index + 1, ns: 'subdivisions' })}
                                <HStack gap={4}>
                                    <VStack gap={4}>
                                        <HStack>
                                            <Controller
                                                name={`addresses.${index}.name`}
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field, fieldState }) => {
                                                    return (
                                                        <Input
                                                            required
                                                            disabled={isLoading}
                                                            variant="outline"
                                                            label={t('form.inputs.address.name', {
                                                                ns: 'subdivisions',
                                                            })}
                                                            isError={Boolean(fieldState.error)}
                                                            errorMessage={Boolean(fieldState.error)}
                                                            {...field}
                                                        />
                                                    )
                                                }}
                                            />
                                        </HStack>
                                        <HStack gap={2}>
                                            <Controller
                                                name={`addresses.${index}.workSchedule.startWork`}
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field, fieldState }) => (
                                                    <Input
                                                        required
                                                        disabled={isLoading}
                                                        variant="outline"
                                                        label={t('form.inputs.address.startWork', {
                                                            ns: 'subdivisions',
                                                        })}
                                                        isError={Boolean(fieldState.error)}
                                                        errorMessage={Boolean(fieldState.error)}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                name={`addresses.${index}.workSchedule.finishWork`}
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field, fieldState }) => (
                                                    <Input
                                                        required
                                                        disabled={isLoading}
                                                        variant="outline"
                                                        label={t('form.inputs.address.finishWork', {
                                                            ns: 'subdivisions',
                                                        })}
                                                        isError={Boolean(fieldState.error)}
                                                        errorMessage={Boolean(fieldState.error)}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                name={`addresses.${index}.workSchedule.startBreak`}
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field, fieldState }) => (
                                                    <Input
                                                        required
                                                        disabled={isLoading}
                                                        variant="outline"
                                                        label={t('form.inputs.address.startBreak', {
                                                            ns: 'subdivisions',
                                                        })}
                                                        isError={Boolean(fieldState.error)}
                                                        errorMessage={Boolean(fieldState.error)}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                name={`addresses.${index}.workSchedule.finishBreak`}
                                                control={control}
                                                rules={{
                                                    required: true,
                                                }}
                                                render={({ field, fieldState }) => (
                                                    <Input
                                                        required
                                                        disabled={isLoading}
                                                        variant="outline"
                                                        label={t(
                                                            'form.inputs.address.finishBreak',
                                                            {
                                                                ns: 'subdivisions',
                                                            },
                                                        )}
                                                        isError={Boolean(fieldState.error)}
                                                        errorMessage={Boolean(fieldState.error)}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </HStack>
                                    </VStack>
                                    {index !== 0 && (
                                        <Icon
                                            id="Delete"
                                            clickable
                                            color="GrayText"
                                            size={18}
                                            onClick={() => onDeleteAddressRow(index)}
                                        />
                                    )}
                                </HStack>
                            </VStack>
                        )
                    })}
                </VStack>
                <Button
                    isLoading={isLoading}
                    variant="clear"
                    color="success"
                    onClick={onAddAddressRow}
                >
                    {t('form.btns.add', {
                        ns: 'subdivisions',
                    })}
                </Button>
            </VStack>

            <HStack className={styles.bottom} gap={4}>
                <Button
                    isLoading={isLoadingSubmit}
                    disabled={isLoading}
                    variant="filled"
                    color="success"
                    type="submit"
                >
                    {t('save', { ns: 'translation' })}
                </Button>
                <Button variant="filled" disabled={isLoading} onClick={onCancel}>
                    {t('cancel', { ns: 'translation' })}
                </Button>
            </HStack>
        </form>
    )
})
