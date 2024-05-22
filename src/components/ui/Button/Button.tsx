import classNames from 'classnames';
import React from 'react';
import Loader from '../Loader';
import Text from '../Text';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, ...props }) => {
  const btnClasses = classNames(className, styles.btn, { [styles['btn-loading']]: loading });

  return (
    <button className={btnClasses} disabled={loading} {...props}>
      {loading && <Loader size="s" color="#fff" />}
      <Text view="button" weight="normal">
        {children}
      </Text>
    </button>
  );
};

export default Button;
