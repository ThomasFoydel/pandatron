import React, { useState } from 'react';
import './MasterGain.scss';
import { Knob } from 'react-rotary-knob';

const MasterGain = ({ changeMasterGain }) => {
  const [display, setDisplay] = useState(1);
  const updateMasterGain = (e) => {
    changeMasterGain(e.toFixed(2));
    setDisplay(e);
  };
  return (
    <div className='master-gain'>
      <h2>master gain</h2>
      <div className='center'>{display}</div>
      <Knob
        style={{ display: 'inline-block' }}
        className='center knob'
        min={0}
        max={100}
        value={display.toFixed(2)}
        unlockDistance={10}
        onChange={updateMasterGain}
      />
    </div>
  );
};

export default MasterGain;
