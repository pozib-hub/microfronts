
import { Project, SyntaxKind } from "ts-morph"

const removedFeaturesName = process.argv[2]
const featureState = process.argv[3]

if (!removedFeaturesName) {
    throw new Error("Укажите название фича-флага")
}

if (!featureState) {
    throw new Error("Укажите состояние фичи")
}

if (featureState !== "on" && featureState !== "off") {
    throw new Error("Значение состояние должно быть 'on' или 'off'")
}

const project = new Project({})

project.addSourceFilesAtPaths("src/**/*.ts")
project.addSourceFilesAtPaths("src/**/*.tsx")

const sourceFiles = project.getSourceFiles()

sourceFiles.forEach((sourceFile) => {
    sourceFile.forEachDescendant(node => {
        if (node.isKind(SyntaxKind.CallExpression)) {
            node.forEachChild(child => {
                if (child.isKind(SyntaxKind.Identifier) && child.getText() === "toggleFeatures") {
                    const objectOptions = node
                        .getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression)

                    if (!objectOptions) {
                        return
                    }

                    const featureNameProperty = objectOptions.getProperty("name")
                    const onFnProperty = objectOptions.getProperty("on")
                    const offFnProperty = objectOptions.getProperty("off")

                    const onFn = onFnProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
                    const offFn = offFnProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)

                    const featureName = featureNameProperty
                        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                        ?.getText()
                        .slice(1, -1)

                    if (featureName !== removedFeaturesName) {
                        return
                    }

                    if (featureState === "on") {
                        node.replaceWithText(onFn?.getBody().getText() ?? "")
                    }

                    if (featureState === "off") {
                        node.replaceWithText(offFn?.getBody().getText() ?? "")
                    }

                }
            })
        }
    })
})

project.save()