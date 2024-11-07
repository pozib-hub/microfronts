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
    const [data, setData] = useState<IProfileCardProps['data']>({
        ...args.data,
    })

    const handleChange = (field: string, value: any) => {
        setData((prevData) => ({
            ...prevData,
            [field]: value,
        }))
    }

    return (
        <ProfileCard
            {...args}
            data={data}
            onChangeFirstname={(value) => handleChange('firstname', value)}
            onChangeLastname={(value) => handleChange('lastname', value)}
            onChangeCity={(value) => handleChange('address', { city: value })}
            onChangeAge={(value) => handleChange('age', value)}
            onChangeUsername={(value) => handleChange('username', value)}
            onChangeAvatar={(value) => handleChange('avatar', value)}
        />
    )
}

// Основное состояние с данными
export const Primary = Template.bind({})
Primary.args = {
    data: {
        username: 'John Doe',
        firstname: 'John',
        lastname: "Doe",
        avatar: AvatarImg,
        address: { city: "New York" },
        age: 30,
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
        username: 'Jane Doe',
        firstname: 'Jane',
        lastname: 'Doe',
        avatar: AvatarImg,
        address: { city: 'Los Angeles' },
        age: 28,
    },
    readonly: true,
}