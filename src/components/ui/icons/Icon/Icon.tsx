import React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number;
  height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  width = 24,
  height = 24,
  children,
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};

const withIconWrapper = (WrappedIcon: React.FC<React.SVGProps<SVGSVGElement>>) => {
  return (hocProps: IconProps) => (
    <Icon {...hocProps}>
      <WrappedIcon {...hocProps} />
    </Icon>
  );
};

export { Icon, withIconWrapper };
