import { Meta, StoryObj } from '@storybook/react'

import Avatar from '@shared/assets/tests/Avatar.jpg'
import { ThemeDecorator } from '@shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@shared/const/them'
import ProfilePage from './ProfilePage'
import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'

const meta: Meta<typeof ProfilePage> = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    decorators: [StoreDecorator({
        editProfile: {
            data: {
                username: 'John Doe',
                firstname: 'John',
                lastname: "Doe",
                avatar: Avatar,
            }
        }
    })],
}

export default meta

type Story = StoryObj<typeof ProfilePage>;

export const LightTheme: Story = {
}

export const DarkTheme: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
