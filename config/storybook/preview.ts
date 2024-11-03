import type { Preview } from "@storybook/react"

import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/StyleDecorator"
import {
  ThemeDecorator,
  themesList
} from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator"
import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    layout: "fullscreen",
    backgrounds: {
      values: themesList,
      default: themesList.find(i => i.name === "dark")?.name,
    },
  }
}

export const globalTypes = {
  // TODO switch language
  // local: {
  //   toolbar: {
  //     items: ["en", "ru"]
  //   }
  // }
}

export default {
  ...preview,
  decorators: [RouterDecorator, ThemeDecorator, StyleDecorator],
}