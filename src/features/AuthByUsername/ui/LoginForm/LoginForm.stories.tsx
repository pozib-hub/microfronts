import React from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'
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
        StoreDecorator({
            loginForm: { username: 'admin', password: 'admin' },
        }),
    ],
}

export const Error: Story = {
    decorators: [
        StoreDecorator({
            loginForm: { username: '123', password: 'asd', error: 'ERROR' },
        }),
    ],
}

export const Loading: Story = {
    decorators: [
        StoreDecorator({
            loginForm: { isLoading: true },
        }),
    ],
}

