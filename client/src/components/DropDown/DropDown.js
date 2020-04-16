import React, { useState } from 'react';
import './DropDown.scss';

const DropDown = ({ options, updateFunction, initVal, inputId }) => {
  const [opened, setOpened] = useState(false);
  const [currentVal, setCurrentVal] = useState(initVal.val);

  const selectOption = (e) => {
    setCurrentVal(e);
    setOpened(false);
    updateFunction({ target: { value: e, id: inputId } });
  };

  return (
    <div
      className={`dropdown dropdown-open${opened}`}
      onMouseEnter={() => setOpened(true)}
      onMouseLeave={() => setOpened(false)}
    >
      <div className='closed option'>{currentVal}</div>

      {opened && (
        <div className='open center'>
          {options.map((option) => {
            console.log(option.val);
            return (
              <div
                className={`option ${
                  currentVal === option.val && 'current-option'
                }`}
                value={option.val}
                id={option.val}
                onClick={() => selectOption(option.val)}
                key={option.val}
              >
                {option.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDown;
