
import { Meta, StoryObj } from '@storybook/react'

import { CenterDecorator } from 'shared/config/storybook/CenterDecorator/CenterDecorator'
import AvatarImg from './storybook.jpg'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
    title: 'shared/Avatar',
    component: Avatar,
}

export default meta

type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
    args: {
        size: 150,
        src: AvatarImg,
    },
    decorators: [CenterDecorator],
}

export const Small: Story = {
    args: {
        size: 50,
        src: AvatarImg,
    },
    decorators: [CenterDecorator],
}
