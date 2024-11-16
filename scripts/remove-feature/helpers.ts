import { CallExpression, JsxAttribute, JsxSelfClosingElement, SyntaxKind } from 'ts-morph'

const toggleFunctionName = 'toggleFeatures'
const toggleComponentName = 'ToggleFeatures'

export function isToggleFunction(node: CallExpression) {
    let isToggleFeatures = false

    node.forEachChild((child) => {
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
            isToggleFeatures = true
        }
    })

    return isToggleFeatures
}

export function isToggleComponent(node: JsxSelfClosingElement) {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier)
    return identifier?.getText() === toggleComponentName
}

export const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) => {
    return jsxAttributes.find((node) => node.getText() === name)
}

export function getReplacedComponent(attribute?: JsxAttribute) {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText()

    if (value?.startsWith('(')) {
        return value.slice(1, -1)
    }

    return value
}

export function replaceToggleFunction(
    node: CallExpression,
    removedFeatureName: string,
    featureState: string,
) {
    const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression)

    if (!objectOptions) {
        return
    }

    const featureNameProperty = objectOptions.getProperty('name')
    const onFnProperty = objectOptions.getProperty('on')
    const offFnProperty = objectOptions.getProperty('off')

    const onFn = onFnProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
    const offFn = offFnProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)

    const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        ?.slice(1, -1)

    if (featureName !== removedFeatureName) {
        return
    }

    if (featureState === 'on') {
        node.replaceWithText(onFn?.getBody().getText() ?? '')
    }

    if (featureState === 'off') {
        node.replaceWithText(offFn?.getBody().getText() ?? '')
    }
}

export function replaceComponent(
    node: JsxSelfClosingElement,
    removedFeatureName: string,
    featureState: string,
) {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute)

    const onAttribute = getAttributeNodeByName(attributes, 'on')
    const offAttribute = getAttributeNodeByName(attributes, 'off')

    const featureNameAttribute = getAttributeNodeByName(attributes, 'feature')
    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        ?.slice(1, -1)

    if (featureName !== removedFeatureName) return

    const offValue = getReplacedComponent(offAttribute)
    const onValue = getReplacedComponent(onAttribute)

    if (featureState === 'on' && onValue) {
        node.replaceWithText(onValue)
    }

    if (featureState === 'off' && offValue) {
        node.replaceWithText(offValue)
    }
}
