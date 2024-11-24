/* eslint-disable no-use-before-define */
export type Value = string | boolean | undefined | null
export type Mapping = Record<string, any>
export type ArgumentArray = Array<Argument>
export type ReadonlyArgumentArray = ReadonlyArray<Argument>
export type Argument = Value | Mapping | ArgumentArray | ReadonlyArgumentArray

export default function classNames(...args: ArgumentArray): string {
    let resultClassName = ''

    for (let index = 0; index < args.length; index++) {
        const arg = args[index] as Argument

        if (arg) {
            if (typeof arg === 'string') {
                resultClassName += ` ${arg.trim()}`
            } else if (Array.isArray(arg)) {
                resultClassName += classNames(...arg)
            } else {
                const classNamesArr = Object.entries(arg)
                    .filter(([className, value]) => Boolean(value))
                    .map(([className, value]) => className)

                if (classNamesArr.length) {
                    resultClassName += ` ${classNamesArr.join(' ')}`
                }
            }
        }
    }

    return resultClassName.trim()
}
