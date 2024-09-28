
import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from '@shared/config/storybook/CenterDecorator/CenterDecorator'
import { Icon } from './Icon'

const meta: Meta<typeof Icon> = {
    title: 'shared/Icon',
    component: Icon,
}

export default meta

type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
    args: {
        // size: 150,
        // src: IconImg,
    },
    decorators: [CenterDecorator],
}

export const Small: Story = {
    args: {
        // size: 50,
        // src: IconImg,
    },
    decorators: [CenterDecorator],
}

