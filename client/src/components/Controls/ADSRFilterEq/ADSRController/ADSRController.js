import React, { useState } from 'react';
import './ADSRController.scss';

const ADSRController = ({ changeADSR, initEnvelope }) => {
  const [envelope, setEnvelope] = useState(initEnvelope);

  const changeDisplayState = (newVal, property) => {
    setEnvelope({ ...envelope, [property]: newVal });
  };

  const updateADSR = (e) => {
    let { value, id } = e.target;
    changeADSR(+value / 100, id);
    changeDisplayState(+value / 100, id);
  };
  const { attack, decay, sustain, release } = envelope;
  return (
    <div className='adsr'>
      <div className='inner-rotate'>
        <div className='aspect'>
          <div className='val attack-val'>{attack.toFixed(2)}</div>
          <span className='aspect-initial'>A</span>
          <input
            type='range'
            max='200'
            id='attack'
            value={attack * 100}
            onChange={updateADSR}
          />
        </div>
        <div className='aspect'>
          <div className='val decay-val'>{decay.toFixed(2)}</div>
          <span className='aspect-initial'>D</span>
          <input
            type='range'
            id='decay'
            max='200'
            value={decay * 100}
            onChange={updateADSR}
          />
        </div>
        <div className='aspect'>
          <div className='val sustain-val'>{sustain.toFixed(2)}</div>
          <span className='aspect-initial'>S</span>
          <input
            type='range'
            id='sustain'
            max='200'
            value={sustain * 100}
            onChange={updateADSR}
          />
        </div>
        <div className='aspect'>
          <div className='val release-val'>{release.toFixed(2)}</div>
          <span className='aspect-initial'>R</span>
          <input
            type='range'
            id='release'
            max='200'
            value={release * 100}
            onChange={updateADSR}
          />
        </div>
      </div>
      <div className='value-displays'></div>
    </div>
  );
};

export default ADSRController;
