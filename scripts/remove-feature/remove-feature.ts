import { Project, SyntaxKind } from 'ts-morph'
import {
    isToggleComponent,
    isToggleFunction,
    replaceToggleFunction,
    replaceComponent,
} from './helpers'

const removedFeatureName = process.argv[2]
const featureState = process.argv[3]

if (!removedFeatureName) {
    throw new Error('Укажите название фича-флага')
}

if (!featureState) {
    throw new Error('Укажите состояние фичи')
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error("Значение состояние должно быть 'on' или 'off'")
}

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const sourceFiles = project.getSourceFiles()

sourceFiles.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            replaceToggleFunction(node, removedFeatureName, featureState)
        }

        if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
            replaceComponent(node, removedFeatureName, featureState)
        }
    })
})

project.save()
