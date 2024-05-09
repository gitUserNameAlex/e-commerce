import React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = props => {
  const maxLinesStyle = props.maxLines
    ? {
        display: '-webkit-box',
        WebkitLineClamp: props.maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }
    : {};

  const elemProps = {
    className: `
            ${props.className}
            ${styles.general}
            ${styles[props.view || '']}
            ${styles[props.weight || '']}
            ${styles[props.color || 'inherit']}
            `,
    style: maxLinesStyle,
  };

  return React.createElement(props.tag || 'p', elemProps, props.children);
};

export default Text;
