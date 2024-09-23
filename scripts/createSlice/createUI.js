/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path")
const fs = require("fs/promises")

const { firstUpperCase } = require('./helpers')
const { templateComponent, templateStory, templateStyle } = require("./templates")

module.exports = async (to, layer, sliceName) => {
    const pathToUI = path.join(to, "ui")

    try {
        await fs.mkdir(pathToUI)
    } catch (error) {
        console.log(error)
        throw new Error('Не удалось создать UI директорию')
    }

    try {
        const componentName = firstUpperCase(sliceName)
        await fs.mkdir(path.join(pathToUI, componentName))
        await fs.writeFile(
            path.join(pathToUI, componentName, `${componentName}.tsx`),
            templateComponent(componentName),
        )
        await fs.writeFile(
            path.join(pathToUI, componentName, `${componentName}.stories.tsx`),
            templateStory(layer, componentName),
        )
        await fs.writeFile(
            path.join(pathToUI, componentName, `${componentName}.module.scss`),
            templateStyle(componentName),
        )
    } catch (e) {
        console.log('Не удалось создать компонент')
    }
}