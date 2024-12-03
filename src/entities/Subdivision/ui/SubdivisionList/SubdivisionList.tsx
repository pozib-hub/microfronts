import React, { FC, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import cn from '@shared/lib/classNames/classNames'
import { HStack, VStack } from '@shared/ui/Stack'
import { Card } from '@shared/ui/Card'
import { Text } from '@shared/ui/Text'
import { routePath } from '@shared/const/router'
import { Pagination } from '@shared/ui/Pagination/Pagination'
import { Icon } from '@shared/ui/Icon/Icon'
import { showNotification } from '@shared/ui/Notification'
import { showAlert } from '@shared/ui/Alert'

import { useDeleteSubdivision, useSubdivisions } from '../../api/subdivisionApi'
import { SubdivisionListSkeletons } from './SubdivisionListSkeletons'

import styles from './SubdivisionList.module.scss'

interface ISubdivisionListProps {
    className?: string
}

const PAGE_SIZE = 10

export const SubdivisionList: FC<ISubdivisionListProps> = memo(function SubdivisionList(props) {
    const { className } = props

    const [page, setPage] = useState(1)

    const { t } = useTranslation('subdivisions')
    const navigate = useNavigate()

    const { isLoading, isError, data, refetch } = useSubdivisions(
        { page, limit: PAGE_SIZE },
        { refetchOnMountOrArgChange: 0.1 },
    )

    const [deleteSubdivision] = useDeleteSubdivision()

    const onGoToEdit = (id: string) => {
        navigate(routePath.subdivisionEdit(id))
    }

    const onDelete = async (id: string) => {
        try {
            await deleteSubdivision({ id })
            showNotification({ variant: 'success' })
            refetch()
        } catch (error) {
            showNotification({ variant: 'error', text: t('list.errors.delete') })
        }
    }

    const onClickDelete = (id: string) => {
        const subdivisionName = data?.data.find((s) => s.id === id)?.name

        showAlert({
            type: 'confirm',
            content: t('list.confirmDelete', { name: subdivisionName }),
            onConfirm: () => onDelete(id),
        })
    }

    const onPageChange = (page: number) => {
        setPage(page)
    }

    if (isLoading) {
        return (
            <VStack className={cn(styles.wrapper, className)} fullHeight gap={6}>
                <SubdivisionListSkeletons />
            </VStack>
        )
    }

    if (isError) {
        return (
            <VStack className={cn(styles.wrapper, className)} fullHeight gap={6}>
                {t('list.errors.fetch')}
            </VStack>
        )
    }

    if (!isLoading && !isError && !data?.data.length) {
        return (
            <VStack className={cn(styles.wrapper, className)} fullHeight gap={6}>
                {t('list.empty')}
            </VStack>
        )
    }

    return (
        <VStack className={cn(styles.wrapper, className)} fullWidth fullHeight gap={4}>
            {data?.data.map((subdivision) => (
                <Card key={subdivision.id} fullWidth padding={4}>
                    <HStack justify="between">
                        <VStack gap={4}>
                            <Text bold>{subdivision.name}</Text>
                            <VStack gap={1.5}>
                                <Text bold>{t('list.addresses.title')}</Text>
                                <VStack gap={1}>
                                    {subdivision.addresses.map((address, index) => {
                                        const isAddressDefault =
                                            address.id === subdivision.defaultAddressId

                                        if (isAddressDefault) {
                                            return (
                                                <HStack key={address.id} gap={2} align="center">
                                                    <span>{index + 1 + ': '}</span>
                                                    <span>{address.name}</span>
                                                    <span>{' - '}</span>
                                                    <Text variant="hint">
                                                        {t('list.addresses.default')}
                                                    </Text>
                                                </HStack>
                                            )
                                        }

                                        return (
                                            <HStack key={address.id} gap={2} align="center">
                                                <span>{index + 1 + ': '}</span>
                                                <span>{address.name}</span>
                                            </HStack>
                                        )
                                    })}
                                </VStack>
                            </VStack>
                        </VStack>
                        <HStack gap={2} align="center">
                            <Icon
                                clickable
                                id="Edit"
                                color="gray"
                                size={20}
                                onClick={() => onGoToEdit(subdivision.id)}
                            />
                            <Icon
                                clickable
                                id="Delete"
                                color="darkred"
                                size={20}
                                onClick={() => onClickDelete(subdivision.id)}
                            />
                        </HStack>
                    </HStack>
                </Card>
            ))}

            <HStack fullWidth justify="center">
                <Pagination
                    currentPage={page}
                    pageSize={PAGE_SIZE}
                    totalCount={data?.totalCount || 0}
                    onPageChange={onPageChange}
                />
            </HStack>
        </VStack>
    )
})
