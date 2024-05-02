import React, { FC } from 'react';
import Icon from '../Icon';
import { IconProps } from '../Icon';

const ArrowBackIcon: FC<IconProps> = ({ className, width = 32, height = 32, ...props }) => {
  return (
    <Icon className={className} width={width} height={height} viewBox="0 0 32 32" {...props}>
      <path
        d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
        stroke="black"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowBackIcon;
