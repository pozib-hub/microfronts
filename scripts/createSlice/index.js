/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs")
const util = require("util")
const path = require("path")

const mkdir = util.promisify(fs.mkdir)

const { pathToSrc, firstUpperCase } = require("./helpers")
const createModel = require("./createModel")
const createUI = require("./createUI")
const createPublicApi = require("./createPublicApi")

const layer = process.argv[2]
const sliceName = process.argv[3]

const layers = ["features", "entities", "pages"]

async function init() {
    if (!layer || !layers.includes(layer)) {
        throw new Error(`Укажите слой ${layers.join(" или ")}`)
    }

    if (!sliceName) {
        throw new Error(`Укажите название слайса`)
    }

    let ends = ""
    if (layer === "pages") {
        ends = "Page"
    }

    const pathToSlice = path.join(pathToSrc, layer, firstUpperCase(sliceName) + ends)

    await mkdir(pathToSlice)
    await createModel(pathToSlice, layer, sliceName)
    await createUI(pathToSlice, layer, sliceName)
    await createPublicApi(pathToSlice, layer, sliceName)
}

try {
    init()
} catch (error) {
    console.log(error)
}
