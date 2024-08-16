declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classnames: IClassNames
  export = classnames;
}

// declare module '*.scss' {
//   const content: { [className: string]: string }
//   export default content
// }

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
  import React from 'react'

  const SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare const __IS_DEV__: boolean

// declare module '*.svg' {
//   const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
//   const content: string;

//   export { ReactComponent };
//   export default content;
// }

// Primitive types (+ Date) are themselves. Or maybe undefined.
declare type PartialDeep<T> =
  T extends string | number | bigint | boolean | null | undefined | symbol | Date
  ? T | undefined
  // Arrays, Sets and Maps and their readonly counterparts have their items made
  // deeply partial, but their own instances are left untouched
  : T extends Array<infer ArrayType>
  ? Array<PartialDeep<ArrayType>>
  : T extends ReadonlyArray<infer ArrayType>
  ? ReadonlyArray<ArrayType>
  : T extends Set<infer SetType>
  ? Set<PartialDeep<SetType>>
  : T extends ReadonlySet<infer SetType>
  ? ReadonlySet<SetType>
  : T extends Map<infer KeyType, infer ValueType>
  ? Map<PartialDeep<KeyType>, PartialDeep<ValueType>>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>>
  // ...and finally, all other objects.
  : {
    [K in keyof T]?: PartialDeep<T[K]>;
  };

declare type OnlyOptionalKeys<State> =
  keyof { [K in keyof State as[undefined] extends [State[K]] ? K : never]: true }