import React, { useState } from 'react';
import './DelayController.scss';
import { Knob } from 'react-rotary-knob';

const DelayController = ({ changeDelayTime, initVals, changeMix }) => {
  const [time, setTime] = useState(initVals.time * 100);
  const [mix, setMix] = useState(initVals.mix);

  const updateDelayTime = (e) => {
    changeDelayTime(e / 100);
    setTime(e / 100);
  };

  const updateDelayMix = (e) => {
    changeMix(e);
    setMix(e / 100);
  };

  return (
    <div className='delay'>
      <h2 className='center'>delay</h2>
      <div className='time'>
        <h6 className='title'>time</h6>

        <Knob
          style={{ display: 'inline-block' }}
          className='center knob'
          min={0}
          max={100}
          value={time * 100}
          unlockDistance={10}
          onChange={updateDelayTime}
        />
        <div className='value-display center'>{time.toFixed(2)}</div>
      </div>

      <div className='amount'>
        <h6 className='title'>wet / dry</h6>
        <Knob
          style={{ display: 'inline-block' }}
          className='center knob'
          min={0}
          max={100}
          value={mix * 100}
          unlockDistance={10}
          onChange={updateDelayMix}
        />
        <div className='value-display center'>{mix.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default DelayController;
