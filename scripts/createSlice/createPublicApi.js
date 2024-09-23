/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path")
const fs = require("fs/promises")

const { firstUpperCase } = require('./helpers')

module.exports = async (to, layer, sliceName) => {
    const componentName = firstUpperCase(sliceName)

    try {
        await fs.writeFile(
            path.join(to, 'index.ts'),
            `export { ${componentName} } from './ui/${componentName}/${componentName}';
            export { I${firstUpperCase(sliceName)}Schema } from './model/types/${sliceName}';`,
        )
    } catch (e) {
        console.log('Не удалось создать PUBLIC API')
    }
}