import React, { useState } from 'react';
import './DropDown.scss';

const DropDown = ({ options, updateFunction, initVal, inputId }) => {
  const [opened, setOpened] = useState(false);
  const [currentVal, setCurrentVal] = useState(initVal);

  const selectOption = (e) => {
    let newVal = e.target.id;

    setCurrentVal(newVal);
    setOpened(false);
    updateFunction({ target: { value: newVal, id: inputId } });
  };

  return (
    <div className='dropdown'>
      <div className='closed option' onClick={() => setOpened(true)}>
        {currentVal}
      </div>

      {opened && (
        <div className='open center'>
          {options.map((option) => {
            return (
              <div
                className={`option ${
                  currentVal === option && 'current-option'
                }`}
                value={option}
                id={option}
                onClick={(option) => selectOption(option)}
                key={option}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDown;
