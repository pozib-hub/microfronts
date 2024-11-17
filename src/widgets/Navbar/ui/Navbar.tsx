import React, { useCallback, memo, useState, FC } from 'react'

import { ToggleFeatures } from '@shared/lib/features'
import { DeprecatedNavbar } from './DeprecatedNavbar/DeprecatedNavbar'
import { NewNavbar } from './NewNavbar/NewNavbar'

interface INavbarProps {
    className?: string
}

export const Navbar: FC<INavbarProps> = memo(function Navbar(props) {
    const { className } = props

    return <ToggleFeatures name="isAppRedesigned" on={<NewNavbar />} off={<DeprecatedNavbar />} />
})
