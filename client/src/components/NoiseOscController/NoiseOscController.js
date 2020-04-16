import React, { useState } from 'react';
import './NoiseOscController.scss';
import { Knob } from 'react-rotary-knob';
import DropDown from 'components/DropDown/DropDown';

const NoiseOscController = ({ changeNoiseGain, changeNoiseType, initGain }) => {
  const [gain, setGain] = useState(initGain);
  const [type, setType] = useState('white');
  const updateGain = (e) => {
    changeNoiseGain(e / 1000);
    setGain(e / 1000);
  };
  const updateType = (e) => {
    let { value } = e.target;
    changeNoiseType(value);
    setType(value);
  };
  return (
    <div className='noiseosccontrol'>
      <h4 className='name center'>noise osc</h4>

      <div className='gain-knob center'>
        <h3>gain</h3>
        <div>{(gain * 1000).toFixed(2)}</div>

        <Knob
          style={{ display: 'inline-block' }}
          min={0}
          max={1000}
          value={gain * 1000}
          unlockDistance={10}
          onChange={updateGain}
        />
      </div>
      <div className='dropdown center'>
        <DropDown
          updateFunction={updateType}
          inputId={'type'}
          initVal={{ val: 'white', text: 'white' }}
          options={[
            { val: 'white', text: 'white' },
            { val: 'pink', text: 'pink' },
            { val: 'brown', text: 'brown' },
          ]}
        />
      </div>
    </div>
  );
};

export default NoiseOscController;
