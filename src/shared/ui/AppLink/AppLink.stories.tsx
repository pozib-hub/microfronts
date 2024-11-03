import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { AppLink } from './AppLink'

const meta: Meta<typeof AppLink> = {
    title: 'shared/AppLink',
    args: {
        to: '',
        children: 'Text',
    },
    component: AppLink,
}

export default meta

type Story = StoryObj<typeof AppLink>;

export const Primary: Story = {
    args: {
        variant: 'primary',
    },
    decorators: [CenterDecorator],
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
    },
    decorators: [CenterDecorator],
}
