/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path")
const fs = require('fs/promises')

const { pathToSrc, firstUpperCase } = require('./helpers')
const { templateSlice, templateServiceFetch, templateTypeSchema } = require("./templates")

module.exports = async (to, layer, sliceName) => {

    const upperSliceName = firstUpperCase(sliceName)
    const pathToModel = path.join(to, "model")

    let ends = ""
    if (layer === "pages") {
        ends = "Page"
    }

    try {
        await fs.mkdir(pathToModel)
        await fs.mkdir(path.join(pathToModel, "types"))
        await fs.mkdir(path.join(pathToModel, "slices"))
        await fs.mkdir(path.join(pathToModel, "service"))
        await fs.mkdir(path.join(pathToModel, "selectors"))
    } catch (error) {
        console.log(error)
        throw new Error(`Не удалось создать model сегмент для слайса ${sliceName}`)
    }

    try {
        await fs.writeFile(
            path.join(pathToModel, "service", `fetch${upperSliceName}.ts`),
            templateServiceFetch(upperSliceName + ends, upperSliceName)
        )
    } catch (error) {
        console.log(error)
        throw new Error(`Не удалось создать service fetch${upperSliceName} для слайса ${sliceName}`)
    }

    try {
        await fs.writeFile(
            path.join(pathToModel, "slices", `${upperSliceName}Slice.ts`),
            templateSlice(upperSliceName)
        )
    } catch (error) {
        console.log(error)
        throw new Error(`Не удалось создать slice для слайса ${sliceName}`)
    }

    try {
        await fs.writeFile(
            path.join(pathToModel, "types", `${sliceName}.ts`),
            templateTypeSchema(upperSliceName)
        )
    } catch (error) {
        console.log(error)
        throw new Error("Не удалось создать тип схемы стейта")
    }


}