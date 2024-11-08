import { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'

import { EditableProfilePageHeader } from './EditableProfilePageHeader'

const data = {
    age: 45,
    firstname: "John",
    lastname: "Doe",
    username: "Pozib",
    address: {
        street: "123 Main St",
        city: "New York",
        zip: "10001"
    },
}

const meta: Meta<typeof EditableProfilePageHeader> = {
    title: 'features/EditableProfileCard/EditableProfilePageHeader',
    component: EditableProfilePageHeader,
}

export default meta

type Story = StoryObj<typeof EditableProfilePageHeader>;

export const Base: Story = {
    decorators: [StoreDecorator({
        editProfile: {
            data: data
        }
    })]
}

export const ReadOnly: Story = {
    decorators: [StoreDecorator({
        editProfile: {
            readonly: true,
        }
    })]
}
