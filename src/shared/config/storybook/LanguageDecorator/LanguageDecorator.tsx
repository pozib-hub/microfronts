import { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { StoryFn, StoryContext } from '@storybook/react'

import i18n from '../../i18n/i18n'

i18n.on("languageChanged", (locale) => {
    const direction = i18n.dir(locale)
    document.dir = direction
})

export const LanguageDecorator = (Story: StoryFn, context: StoryContext) => {
    const { local } = context.globals

    useEffect(() => {
        i18n.changeLanguage(local)

    }, [local])

    return <Suspense fallback={<div>loading translations...</div>}>
        <I18nextProvider i18n={i18n}>
            <Story />
        </I18nextProvider>
    </Suspense>
}
