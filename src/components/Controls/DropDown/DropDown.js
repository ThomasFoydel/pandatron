import cn from 'classnames'
import React, { useState } from 'react'
import './DropDown.scss'

const DropDown = ({ options, updateFunction, inputId, current }) => {
  const [opened, setOpened] = useState(false)

  const selectOption = (e) => {
    setOpened(false)
    updateFunction({ target: { value: e, id: inputId } })
  }

  return (
    <div
      className={cn('dropdown', 'center', opened && 'open')}
      onClick={() => setOpened((o) => !o)}
    >
      <div className={cn('closed', 'option')}>{current}</div>

      {opened && (
        <div onClick={() => setOpened((o) => !o)} className={cn('open', 'center')}>
          {options.map((option) => (
            <div
              className={cn('option', current === option.val && 'currentOption')}
              value={option.val}
              id={option.val}
              onClick={() => selectOption(option.val)}
              key={option.val}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropDown
