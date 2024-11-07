import { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'
import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import LoginForm from './LoginForm'

const meta: Meta<typeof LoginForm> = {
    args: {
    },
    title: 'features/LoginForm',
    component: LoginForm,
}

export default meta

type Story = StoryObj<typeof LoginForm>;

export const Success: Story = {
    decorators: [
        CenterDecorator,
        StoreDecorator({
            loginForm: { username: 'admin', password: 'admin' },
        }),
    ],
}

export const Loading: Story = {
    decorators: [
        CenterDecorator,
        StoreDecorator({
            loginForm: { isLoading: true },
        }),
    ],
}

export const Error: Story = {
    decorators: [
        CenterDecorator,
        StoreDecorator({
            loginForm: { username: '123', password: 'asd', error: 'auth.wrongLoginPassword' },
        }),
    ],
}

