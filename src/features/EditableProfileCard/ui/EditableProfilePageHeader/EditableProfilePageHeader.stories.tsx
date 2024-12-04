import { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'
import { IProfile } from '@entities/profile'

import { EditableProfilePageHeader } from './EditableProfilePageHeader'

const data: IProfile = {
    id: '123',
    age: 45,
    firstname: 'John',
    lastname: 'Doe',
    username: 'Pozib',
    subdivision: {
        id: '3',
        name: 'Курская',
    },
    address: {
        id: '2314324234',
        name: 'Московская д 8',
    },
}

const meta: Meta<typeof EditableProfilePageHeader> = {
    title: 'features/EditableProfileCard/EditableProfilePageHeader',
    component: EditableProfilePageHeader,
}

export default meta

type Story = StoryObj<typeof EditableProfilePageHeader>

export const Base: Story = {
    decorators: [
        StoreDecorator({
            editProfile: {
                data: data,
            },
        }),
    ],
}

export const ReadOnly: Story = {
    decorators: [
        StoreDecorator({
            editProfile: {
                readonly: true,
            },
        }),
    ],
}
