import React, { useState } from 'react';
import './DelayController.scss';
import { Knob } from 'react-rotary-knob';

const DelayController = ({ changeDelayTime, initVal }) => {
  const [time, setTime] = useState(initVal * 100);
  const [mix, setMix] = useState(0);

  const updateDelayTime = (e) => {
    changeDelayTime(e / 100);
    setTime(e / 100);
  };
  return (
    <div className='delay'>
      <h2 className='center'>delay</h2>
      <div className='flex'>
        <div className='time'>
          <h6 className='title'>time</h6>

          <Knob
            style={{ display: 'inline-block' }}
            className='center'
            min={0}
            max={100}
            value={time * 100}
            unlockDistance={10}
            onChange={updateDelayTime}
          />
          <div className='center'>{time.toFixed(2)}</div>
        </div>

        <div className='amount'>
          <h6 className='title'>wet / dry</h6>
          <Knob
            style={{ display: 'inline-block' }}
            className='center'
            min={0}
            max={100}
            // value={time * 100}
            unlockDistance={10}
            //   onChange={updateDelayTime}
          />
          <div className='center'>{time.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default DelayController;
