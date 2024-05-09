import classNames from 'classnames';
import React, { useState } from 'react';
// import styles from './CheckBox.module.scss';
import './CheckBox.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ className, checked, onChange, disabled, ...props }) => {
  const [clicked, setClicked] = useState(checked);

  const labelClasses = classNames(className, disabled ? 'labelDisabled' : 'label');
  const iconStroke = disabled ? 'rgba(0, 0, 0, 0.2)' : '#518581';

  const handleInput = () => {
    const newClicked = !clicked;
    setClicked(newClicked);
    onChange(newClicked);
  };

  return (
    <label className={labelClasses}>
      <input
        type="checkbox"
        className="checkboxInp"
        disabled={disabled}
        checked={clicked}
        onClick={handleInput}
        {...props}
      />

      {clicked && (
        <svg
          className="customIcon"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.66663 19.3548L16.4625 30L33.3333 11.6667" stroke={iconStroke} strokeWidth="3.33333" />
        </svg>
      )}
    </label>
  );
};

export default CheckBox;
