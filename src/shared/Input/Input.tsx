import classNames from 'classnames'
import React from 'react'
import styles from './Input.module.scss'

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, afterSlot, disabled, ...props }) => {
    const inpClasses = classNames(className, styles.inpContainer)

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    }

    return (
      <div className={inpClasses}>
        <input
          type="text"
          placeholder={value}
          value={value}
          className={styles.inp}
          onChange={handleInput}
          disabled={disabled}
          {...props}
        />

        {afterSlot && <div className={styles.afterIcon}>{afterSlot}</div>}
      </div>
    )
  },
)

export default Input
