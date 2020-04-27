import React, { useState } from 'react';
import './DistortionController.scss';
import { Knob } from 'react-rotary-knob';

const DistortionController = ({
  changeDistortion1Amount,
  changeDistortion1Mix,
  initVals: { amountVal, mixVal },
}) => {
  const [amount, setAmount] = useState(amountVal);
  const [mix, setMix] = useState(mixVal.toFixed(2));
  const updateAmount = (e) => {
    setAmount(e);
    changeDistortion1Amount(e);
  };

  const updateMix = (e) => {
    setMix(e.toFixed(2));
    changeDistortion1Mix(e);
  };
  const displayMixVal = (+mix).toFixed(0);
  return (
    <div className='distortion'>
      <div className='center inner'>
        <h2>distortion I</h2>
        <h6 className='property'>amount</h6>
        <Knob
          className='knob'
          style={{ display: 'inline-block' }}
          min={0}
          max={100}
          value={amount}
          unlockDistance={10}
          onChange={updateAmount}
        />
        {/* <input value={amount} type='range' onChange={updateAmount} /> */}
        <div>{(amount * 5).toFixed(2)}</div>
        <h6 className='property'>mix</h6>
        {/* <input value={displayMixVal} type='range' onChange={updateMix} /> */}

        <Knob
          className='knob'
          style={{ display: 'inline-block' }}
          min={0}
          max={100}
          value={displayMixVal}
          unlockDistance={10}
          onChange={updateMix}
        />
        <div className='center'>{mix}</div>
      </div>
    </div>
  );
};

export default DistortionController;
