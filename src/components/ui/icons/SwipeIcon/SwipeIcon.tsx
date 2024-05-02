import React, { FC } from 'react';
import Icon from '../Icon';
import { IconProps } from '../Icon';

const SwipeIcon: FC<IconProps> = ({ className, width = 31, height = 31, ...props }) => {
  return (
    <Icon className={className} width={width} height={height} viewBox="0 0 31 31" {...props}>
      <path
        d="M11.957 25.6126L20.0439 17.5258C20.9989 16.5708 20.9989 15.008 20.0439 14.0529L11.957 5.96613"
        stroke="white"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default SwipeIcon;
