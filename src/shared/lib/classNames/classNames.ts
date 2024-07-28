/* eslint-disable no-use-before-define */
export type Value = string | boolean | undefined | null;
export type Mapping = Record<string, any>;
export interface ArgumentArray extends Array<Argument> {}
export interface ReadonlyArgumentArray extends ReadonlyArray<Argument> {}
export type Argument = Value | Mapping | ArgumentArray | ReadonlyArgumentArray;

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

// export default function classNames(
//   className: string = "",
//   mods?: Mods,
//   additional?: string | string[]
// ): string {
//   let initArray: string[] = [className];

//   if (Array.isArray(additional)) {
//     initArray = initArray.concat(additional.filter(Boolean));
//   } else {
//     initArray.push(additional);
//   }

//   const modsArray = Object.entries(mods)
//     .filter(([className, value]) => Boolean(value))
//     .map(([className, value]) => className);

//   return initArray.concat(modsArray).join(" ");
// }
