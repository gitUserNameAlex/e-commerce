import * as React from 'react'
import Icon from '../Icon'
import { IconProps } from '../Icon'
import styles from './CheckIcon.module.scss'

const CheckIcon: React.FC<IconProps> = ({ color, width = 24, height = 24, ...props }) => {
  const iconColor = `${color === 'accent' ? styles.accent : color === 'secondary' ? styles.secondary : color === 'primary' ? styles.primary : styles.inherit}`

  return (
    <Icon width={width} height={height} viewBox="0 0 24 24" {...props}>
      <path className={iconColor} d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
    </Icon>
  )
}

export default CheckIcon
