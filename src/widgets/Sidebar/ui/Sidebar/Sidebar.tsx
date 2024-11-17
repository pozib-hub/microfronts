import React, { FC, memo } from 'react'

import { ToggleFeatures } from '@shared/lib/features'
import { DeprecatedSidebar } from './DeprecatedSidebar/DeprecatedSidebar'
import { NewSidebar } from './NewSidebar/NewSidebar'

interface ISidebarProps {
    className?: string
}

export const Sidebar: FC<ISidebarProps> = memo(function Sidebar(props) {
    return <ToggleFeatures name="isAppRedesigned" on={<NewSidebar />} off={<DeprecatedSidebar />} />
})
