

import { Meta, StoryObj } from '@storybook/react'
import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
    title: 'shared/Select',
    component: Select,
}

export default meta

type Story = StoryObj<typeof Select>;

export const Primary: Story = {
    args: {
        label: 'Укажите значение',
        options: [
            { value: '123', content: 'Первый пункт' },
            { value: '1234', content: 'Второй пункт' },
        ],
    },
    decorators: [CenterDecorator],
}




