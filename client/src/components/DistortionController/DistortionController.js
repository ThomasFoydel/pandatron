import React, { useState } from 'react';
import './DistortionController.scss';
import { Knob } from 'react-rotary-knob';

const DistortionController = ({ changeDistortion }) => {
  const [amount, setAmount] = useState(0);
  const updateDistortion = (e) => {
    setAmount(e);
    changeDistortion(e);
  };

  return (
    <div className='distortion'>
      <div className='center inner'>
        <h2>distortion</h2>

        <Knob
          style={{ display: 'inline-block' }}
          min={0}
          max={100}
          value={amount}
          unlockDistance={10}
          onChange={updateDistortion}
        />
        <div>{(amount * 5).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default DistortionController;
