import { StoryFn, StoryContext } from '@storybook/react'

import { ThemeProvider } from '@app/providers/ThemeProvider'
import { Theme } from '@shared/const/them'

import '@app/styles/index.scss'

// Определяем темы
export const themesList = [
    { name: 'light', class: Theme.LIGHT, value: '#3a3d41' },
    { name: 'dark', class: Theme.DARK, value: "#090949" },
    { name: 'orange', class: Theme.ORANGE, value: "#bd5012" },
]

export const ThemeDecorator = (Story: StoryFn, context: StoryContext) => {
    const themeClass = themesList.find(t => t.value === context?.globals.backgrounds?.value)?.class

    return <ThemeProvider>
        <div className={`app ${themeClass}`}>
            <Story />
        </div>
    </ThemeProvider>
}
