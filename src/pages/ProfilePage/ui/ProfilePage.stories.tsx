import { Meta, StoryObj } from '@storybook/react'

import { ThemeDecorator } from 'src/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'src/app/providers/ThemeProvider'
import ProfilePage from './ProfilePage'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

const meta: Meta<typeof ProfilePage> = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    decorators: [StoreDecorator({})],
}

export default meta

type Story = StoryObj<typeof ProfilePage>;

export const LightTheme: Story = {
}

export const DarkTheme: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
