import React, { useState, useRef, useEffect } from 'react'
import Input from '../Input'
import styles from './MultiDropdown.module.scss'

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string
  /** Значение варианта, отображается пользователю */
  value: string
}

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string
  /** Массив возможных вариантов для выбора */
  options: Option[]
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[]
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void
  /** Заблокирован ли дропдаун */
  disabled?: boolean
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string
}

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  ...props
}) => {
  const [opened, setOpened] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState<string>('')

  const handleInput = (value: string) => {
    setInputValue(value)
  }

  const handleOption = (option: Option) => {
    const optionIdx = value.findIndex(item => item.key === option.key)

    if (optionIdx !== -1) {
      const updatedValue = value.filter(item => item.key !== option.key)
      onChange(updatedValue)
    } else {
      const updatedValue = [...value, option]
      onChange(updatedValue)
    }
  }

  const sortedOptions = options.filter(option => option.value.toLowerCase().includes(inputValue.toLowerCase()))

  const handleDropdownClose = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpened(false)
    }
  }

  useEffect(() => {
    if (opened) {
      document.addEventListener('click', handleDropdownClose)
    } else {
      document.removeEventListener('click', handleDropdownClose)
    }
    return () => {
      document.removeEventListener('click', handleDropdownClose)
    }
  }, [opened])

  return (
    <div className={className} ref={ref} {...props}>
      <Input
        disabled={disabled}
        value={value.length == 0 ? inputValue : getTitle(value)}
        onChange={handleInput}
        placeholder={getTitle(value)}
        onFocus={() => {
          setOpened(true)
          onChange([])
        }}
      />

      {opened && !disabled && (
        <div className={styles.openedList}>
          {sortedOptions.map(option => (
            <div className={styles.options} key={option.key} onClick={() => handleOption(option)}>
              <input type="checkbox" checked={value.some(item => item.key === option.key)} readOnly />
              <span className={styles.optionVal}>{option.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiDropdown
