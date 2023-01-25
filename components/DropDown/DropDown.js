import cn from 'classnames'
import React, { useState } from 'react'
import styles from './DropDown.module.scss'

const DropDown = ({ options, updateFunction, initVal, inputId }) => {
  const [opened, setOpened] = useState(false)
  const [currentVal, setCurrentVal] = useState(initVal.val)

  const selectOption = (e) => {
    setCurrentVal(e)
    setOpened(false)
    updateFunction({ target: { value: e, id: inputId } })
  }

  return (
    <div
      className={cn(styles.dropdown, 'center', opened && styles.open)}
      onMouseEnter={() => setOpened(true)}
      onMouseLeave={() => setOpened(false)}>
      <div className={cn(styles.closed, styles.option)}>{currentVal}</div>

      {opened && (
        <div className={cn(styles.open, 'center')}>
          {options.map((option) => (
            <div
              className={cn(
                styles.option,
                currentVal === option.val && styles.currentOption
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
