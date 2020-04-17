import React, { useState } from 'react';
import './DistortionController.scss';
import { Knob } from 'react-rotary-knob';

const DistortionController = ({
  changeDistortion1Amount,
  changeDistortion1Mix,
  initVals: { amountVal, mixVal },
}) => {
  const [amount, setAmount] = useState(amountVal);
  const [mix, setMix] = useState(mixVal.toFixed(0));
  const updateAmount = (e) => {
    setAmount(e);
    changeDistortion1Amount(e);
  };

  const updateMix = (e) => {
    const { value } = e.target;
    setMix(value);
    changeDistortion1Mix(value);
  };
  const displayMixVal = (+mix).toFixed(0);
  return (
    <div className='distortion'>
      <div className='center inner'>
        <h2>distortion I</h2>
        <h6 className='center'>amount</h6>
        <Knob
          className='knob'
          style={{ display: 'inline-block' }}
          min={0}
          max={100}
          value={amount}
          unlockDistance={10}
          onChange={updateAmount}
        />
        <div>{(amount * 5).toFixed(2)}</div>
        <h6 className='center'>dry / wet</h6>
        <input value={displayMixVal} type='range' onChange={updateMix} />
        <div className='center'>{mix}</div>
      </div>
    </div>
  );
};

export default DistortionController;
