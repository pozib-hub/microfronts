/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path")

const pathToSrc = path.resolve(__dirname, "..", "..", "src")
const firstUpperCase = (str) => str.at(0).toLocaleUpperCase() + str.slice(1)

module.exports = {
    pathToSrc,
    firstUpperCase,
}