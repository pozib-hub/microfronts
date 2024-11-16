import React, { ReactElement } from 'react'

import { IFeaturesFlags } from '@shared/types/featuresFlags'
import { getFeaturesFlag } from '../setGetFeatures'

interface IToggleFeaturesProps {
    name: keyof IFeaturesFlags
    on: ReactElement
    off: ReactElement
}
export const ToggleFeatures = (props: IToggleFeaturesProps) => {
    const { name, on, off } = props

    if (getFeaturesFlag(name)) {
        return on
    }

    return off
}
