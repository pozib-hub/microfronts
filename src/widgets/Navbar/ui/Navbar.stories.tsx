import { Meta, StoryObj } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

import { Navbar } from './Navbar'

const meta: Meta<typeof Navbar> = {
    title: 'widget/Navbar',
    component: Navbar,
}

export default meta

type Story = StoryObj<typeof Navbar>;

export const Light: Story = {
    decorators: [ThemeDecorator(Theme.LIGHT), StoreDecorator({})]
}

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})]
}

export const Auth: Story = {
    decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({
        user: { authData: {} },
    })],
}