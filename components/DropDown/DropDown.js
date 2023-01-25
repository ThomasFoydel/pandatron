import cn from 'classnames'
import React, { useState } from 'react'
import styles from './DropDown.module.scss'

const DropDown = ({ options, updateFunction, inputId, current }) => {
  const [opened, setOpened] = useState(false)

  const selectOption = (e) => {
    setOpened(false)
    updateFunction({ target: { value: e, id: inputId } })
  }

  return (
    <div
      className={cn(styles.dropdown, 'center', opened && styles.open)}
      onClick={() => setOpened((o) => !o)}>
      <div className={cn(styles.closed, styles.option)}>{current}</div>

      {opened && (
        <div
          onClick={() => setOpened((o) => !o)}
          className={cn(styles.open, 'center')}>
          {options.map((option) => (
            <div
              className={cn(
                styles.option,
                current === option.val && styles.currentOption
              )}
              value={option.val}
              id={option.val}
              onClick={() => selectOption(option.val)}
              key={option.val}>
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropDown
