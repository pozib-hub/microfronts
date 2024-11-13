import { defineConfig } from "cypress"
// require('dotenv').config()

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // modify env value
      // config.env = process.env

      // return config
      return config
    },
    baseUrl: "http://localhost:3000", // change this to your server's URL
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
})
