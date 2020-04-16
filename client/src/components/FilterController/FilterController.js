import React, { useState } from 'react';
import './FilterController.scss';
import DropDown from 'components/DropDown/DropDown';

const FilterController = ({
  changeFilter1Type,
  changeFilter1Freq,
  changeFilter1Q,
  initParams,
}) => {
  const [filterDisplayVals, setFilterDisplayVals] = useState(initParams);

  const updateDisplay = (id, value) => {
    setFilterDisplayVals({ ...filterDisplayVals, [id]: value });
  };

  const updateFilter = ({ target: { value, id } }) => {
    if (id === 'type') {
      changeFilter1Type(value);
      updateDisplay(id, value);
    } else if (id === 'frequency') {
      changeFilter1Freq(value);
      updateDisplay(id, value);
    } else if (id === 'Q') {
      changeFilter1Q(value);
      updateDisplay(id, value);
    }
  };
  const { type, frequency, Q } = filterDisplayVals;
  return (
    <div className='filter1 '>
      <h2 className='center'>filter one</h2>

      <div className='frequency'>
        <div className='center'>
          <b>frequency</b>
        </div>
        <input
          className='center'
          type='range'
          max='1000'
          id='frequency'
          value={frequency}
          onChange={updateFilter}
        />
      </div>
      <div>
        <div className='center'>
          <b>Q</b>
        </div>
        <input
          className='center'
          type='range'
          value={Q}
          id='Q'
          onChange={updateFilter}
        />
      </div>
      <div className='center'>
        <DropDown
          updateFunction={updateFilter}
          inputId={'type'}
          initVal={type}
          options={[
            'lowpass',
            'highpass',
            'lowshelf',
            'highshelf',
            'bandpass',
            'allpass',
            'notch',
          ]}
        />
      </div>
    </div>
  );
};

export default FilterController;
