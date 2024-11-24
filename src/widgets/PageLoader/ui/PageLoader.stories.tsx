import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { PageLoader } from './PageLoader'

const meta: Meta<typeof PageLoader> = {
    title: 'widget/PageLoader',
    component: PageLoader,
    decorators: [CenterDecorator],
}

export default meta

type Story = StoryObj<typeof PageLoader>

export const Default: Story = {}
