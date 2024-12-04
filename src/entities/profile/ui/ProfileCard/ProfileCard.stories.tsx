import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import AvatarImg from '@shared/assets/tests/Avatar.jpg'
import { ProfileCard, IProfileCardProps } from './ProfileCard'

const meta: Meta<typeof ProfileCard> = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
}
export default meta

const Template: StoryFn<IProfileCardProps> = (args) => {
    return <ProfileCard {...args} />
}

// Основное состояние с данными
export const Primary = Template.bind({})
Primary.args = {
    data: {
        id: '1',
        username: 'John Doe',
        firstname: 'John',
        lastname: 'Doe',
        avatar: AvatarImg,
        age: 30,
        address: {
            id: '1',
            name: 'Московская д 8',
        },
        subdivision: {
            id: '1',
            name: 'Курская',
        },
    },
    readonly: false,
}

// Состояние загрузки
export const Loading = Template.bind({})
Loading.args = {
    isLoading: true,
}

// Состояние ошибки
export const Error = Template.bind({})
Error.args = {
    error: 'Error fetching data',
}

// Состояние только для чтения
export const ReadOnly = Template.bind({})
ReadOnly.args = {
    data: {
        id: '1',
        username: 'Jane Doe',
        firstname: 'Jane',
        lastname: 'Doe',
        avatar: AvatarImg,
        address: {
            id: '1',
            name: 'Московская д 8',
        },
        subdivision: {
            id: '1',
            name: 'Курская',
        },
        age: 28,
    },
    readonly: true,
}
