import React, { FC, memo } from 'react'

import { HStack, VStack } from '@shared/ui/Stack'
import { Card } from '@shared/ui/Card'
import { Skeleton } from '@shared/ui/Skeleton'

interface ISubdivisionListSkeletonsProps {
    className?: string
}

const subdivisions = [...new Array(10)]
const addresses = [...new Array(3)]

export const SubdivisionListSkeletons: FC<ISubdivisionListSkeletonsProps> = memo(
    function SubdivisionListSkeletons(props) {
        const { className } = props

        return (
            <VStack fullWidth fullHeight gap={4}>
                {subdivisions.map((s, index) => (
                    <Card key={index} fullWidth padding={4}>
                        <HStack justify="between">
                            <VStack gap={4}>
                                <Skeleton width={300} height={24} border="8px" />
                                <VStack gap={1.5}>
                                    <Skeleton width={100} height={24} border="8px" />
                                    <VStack gap={1}>
                                        {addresses.map((a, index) => (
                                            <HStack key={index} gap={2} align="center">
                                                <span>{index + 1 + ': '}</span>
                                                <Skeleton width={200} height={24} border="8px" />
                                            </HStack>
                                        ))}
                                    </VStack>
                                </VStack>
                            </VStack>
                        </HStack>
                    </Card>
                ))}
            </VStack>
        )
    },
)
