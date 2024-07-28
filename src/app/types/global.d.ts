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
