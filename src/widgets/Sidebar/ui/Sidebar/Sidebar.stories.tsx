import { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@shared/const/them'

import { Sidebar } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
    title: 'widget/Sidebar',
    component: Sidebar,
    decorators: [
        StoreDecorator({})
    ]
}

export default meta

type Story = StoryObj<typeof Sidebar>;

export const Base: Story = {}

export const Auth: Story = {
    decorators: [StoreDecorator({
        user: { authData: {} },
    })],
}
