import React, { useState } from 'react';
import './FilterController.scss';

const FilterController = ({
  changeFilter1Type,
  changeFilter1Freq,
  changeFilter1Q,
  initParams,
}) => {
  // changeFilter1Type
  // changeFilter1Freq
  // changeFilter1Q

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
      <select id='type' className='center' value={type} onChange={updateFilter}>
        <option value='lowpass'>lowpass</option>
        <option value='highpass'>highpass</option>
        <option value='lowshelf'>lowshelf</option>
        <option value='highshelf'>highshelf</option>
        <option value='bandpass'>bandpass</option>
        <option value='allpass'>allpass</option>
        <option value='notch'>notch</option>
      </select>
      <div>
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
    </div>
  );
};

export default FilterController;
