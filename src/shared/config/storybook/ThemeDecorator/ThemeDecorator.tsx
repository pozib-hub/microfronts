import { StoryFn, StoryContext } from '@storybook/react'

import { Theme } from '@shared/const/theme'

import '@app/styles/index.scss'

// Определяем темы
export const themesList = [
    { name: 'light', class: Theme.LIGHT, value: '#E2EEF1' },
    { name: 'dark', class: Theme.DARK, value: '#0C1214' },
    { name: 'orange', class: Theme.ORANGE, value: '#fbf0eb' },
]

export const ThemeDecorator = (Story: StoryFn, context: StoryContext) => {
    const themeClass = themesList.find(
        (t) => t.value === context?.globals.backgrounds?.value,
    )?.class

    return (
        <div className={`app ${themeClass}`}>
            <Story />
        </div>
    )
}
