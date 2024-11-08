import { Meta, StoryObj } from '@storybook/react'

import { StoreDecorator } from '@shared/config/storybook/StoreDecorator/StoreDecorator'

import { ValidateProfileError } from '../../model/const/const'
import { EditableProfileCard } from './EditableProfileCard'

const editProfile = {
    form: {
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
}

const meta: Meta<typeof EditableProfileCard> = {
    title: 'features/EditableProfileCard',
    component: EditableProfileCard,
}

export default meta

type Story = StoryObj<typeof EditableProfileCard>;

export const Base: Story = {
    decorators: [StoreDecorator({ editProfile })]
}

export const ReadOnly: Story = {
    decorators: [StoreDecorator({
        editProfile: {
            readonly: true,
            ...editProfile,
        }
    })]
}

export const Loading: Story = {
    decorators: [StoreDecorator({
        editProfile: {
            isLoading: true,
        }
    })]
}

export const Error: Story = {
    decorators: [StoreDecorator({
        editProfile: {
            error: "true",
        }
    })]
}

export const ValidateInputErrors: Story = {
    decorators: [StoreDecorator({
        editProfile: {
            form: {
                ...editProfile.form,
                address: {
                    city: undefined
                },
                age: undefined,
            },
            validateErrors: [
                ValidateProfileError.INCORRECT_CITY,
                ValidateProfileError.INCORRECT_AGE
            ]
        }
    })]
}
