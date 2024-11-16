import React, { ReactElement } from 'react'

import { getFeaturesFlags } from '@entities/user'
import { IFeaturesFlags } from '@shared/types/featuresFlags'
import { useAppSelector } from '../../../lib/hooks/useAppSelector'

interface IToggleFeaturesProps {
    name: keyof IFeaturesFlags
    on: ReactElement
    off: ReactElement
}
export const ToggleFeatures = (props: IToggleFeaturesProps) => {
    const { name, on, off } = props

    const flags = useAppSelector(getFeaturesFlags)

    if (flags[name]) {
        return on
    }

    return off
}
