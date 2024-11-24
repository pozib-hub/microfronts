import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import { NotificationButton } from './NotificationButton'
import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'

const meta: Meta<typeof NotificationButton> = {
    title: 'features/NotificationButton',
    component: NotificationButton,
    decorators: [StoreDecorator({}), CenterDecorator],
}

export default meta

type Story = StoryObj<typeof NotificationButton>

const mockData = [
    {
        url: `${process.env.URL_API}notifications`,
        method: 'GET',
        status: 200,
        response: [
            {
                id: '1',
                title: 'Уведомление 1',
                description: 'Произошло какое-то событие',
                userId: '1',
            },
            {
                id: '2',
                title: 'Уведомление 2',
                description: 'Произошло какое-то событие',
                userId: '1',
                href: 'http://localhost:3000/admin',
            },
            {
                id: '3',
                title: 'Уведомление 3',
                description: 'Произошло какое-то событие',
                userId: '1',
                href: 'http://localhost:3000/admin',
            },
            {
                id: '4',
                title: 'Уведомление 4',
                description: 'Произошло какое-то событие',
                userId: '1',
            },
            {
                id: '5',
                title: 'Уведомление 1',
                description: 'Произошло какое-то событие',
                userId: '2',
            },
        ],
    },
]

export const Base: Story = {
    parameters: {
        mockData,
    },
}
