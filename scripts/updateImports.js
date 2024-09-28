/* eslint-disable @typescript-eslint/no-require-imports */

const { Project } = require("ts-morph")

const layers = ["app", "shared", "features", "entities", "pages", "widgets"]

function isAbsolute(value) {
    return layers.some(layer => value.startsWith(layer))
}

const project = new Project({})

project.addSourceFilesAtPaths("src/**/*.ts")
project.addSourceFilesAtPaths("src/**/*.tsx")

const sourceFiles = project.getSourceFiles()

sourceFiles.forEach((sourceFile) => {
    const importDeclaration = sourceFile.getImportDeclarations()

    importDeclaration.forEach((importDeclaration) => {
        let value = importDeclaration.getModuleSpecifierValue()

        if (value.startsWith("src/")) {
            value = value.replace("src/", "")
        }

        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier("@" + value)
        }

    })
})

project.save()