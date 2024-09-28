import { Meta, StoryObj } from '@storybook/react'

import Avatar from '@shared/assets/tests/Avatar.jpg'
import { ProfileCard } from './ProfileCard'

const meta: Meta<typeof ProfileCard> = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
}
export default meta


type Story = StoryObj<typeof ProfileCard>;

export const Primary: Story = {
    args: {
        data: {
            username: 'John Doe',
            firstname: 'John',
            lastname: "Doe",
            avatar: Avatar,
        }
    }
}

export const Loading: Story = {
    args: {
        isLoading: true,
    }
}

export const Errors: Story = {
    args: {
        error: 'Error fetching data',
    }
}
