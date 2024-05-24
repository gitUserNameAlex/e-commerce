declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  const src: string;
  export default src;
}

declare module 'react-spin-to-wheel/index' {
  // Вы можете добавить более подробные типы здесь при необходимости.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
