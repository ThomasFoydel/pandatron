import React, { useState } from 'react';
import './MasterGain.scss';
import { Knob } from 'react-rotary-knob';

const MasterGain = ({ changeMasterGain }) => {
  const [display, setDisplay] = useState(1);
  const updateMasterGain = (e) => {
    changeMasterGain(e.toFixed(2));
    setDisplay(+e);
  };
  return (
    <div className='master-gain'>
      <h2 className='title center'>master gain</h2>

      <Knob
        style={{ display: 'inline-block' }}
        className='knob center'
        min={0}
        max={100}
        value={display.toFixed(2)}
        unlockDistance={10}
        onChange={updateMasterGain}
      />
      <div className='center'>{display.toFixed(2)}</div>
    </div>
  );
};

export default MasterGain;
