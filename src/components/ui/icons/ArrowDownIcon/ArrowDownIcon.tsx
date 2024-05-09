import React from 'react';
import Icon from '../Icon';
import { IconProps } from '../Icon';
import styles from './ArrowDownIcon.module.scss';

const ArrowDownIcon: React.FC<IconProps> = ({ color, width = 24, height = 24, ...props }) => {
  const iconColor = `${
    color === 'accent'
      ? styles.accent
      : color === 'secondary'
        ? styles.secondary
        : color === 'primary'
          ? styles.primary
          : styles.inherit
  }`;

  return (
    <Icon width={width} height={height} viewBox="0 0 24 24" {...props}>
      <path
        className={iconColor}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
      />
    </Icon>
  );
};

export default ArrowDownIcon;
