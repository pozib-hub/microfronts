import { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'

import { Navbar } from './Navbar'

const meta: Meta<typeof Navbar> = {
    title: 'widget/Navbar',
    component: Navbar,
}

export default meta

type Story = StoryObj<typeof Navbar>;

export const Base: Story = {
    decorators: [StoreDecorator({})]
}

export const Auth: Story = {
    decorators: [StoreDecorator({
        user: { authData: {} },
    })],
}