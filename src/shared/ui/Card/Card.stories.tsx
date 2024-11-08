import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'

import { Text } from '../Text/Text'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
    title: 'shared/Card',
    component: Card,
    decorators: [CenterDecorator]
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
    args: {
        children: <Text variant='h3'>test</Text>
    },
}
