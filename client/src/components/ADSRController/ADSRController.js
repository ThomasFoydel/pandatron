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
        <div>
          <span className='aspect-initial'>A</span>
          <input
            type='range'
            max='500'
            id='attack'
            value={attack * 100}
            onChange={updateADSR}
          />
        </div>
        <div>
          <span className='aspect-initial'>D</span>
          <input
            type='range'
            id='decay'
            max='500'
            value={decay * 100}
            onChange={updateADSR}
          />
        </div>
        <div>
          <span className='aspect-initial'>S</span>
          <input
            type='range'
            id='sustain'
            max='500'
            value={sustain * 100}
            onChange={updateADSR}
          />
        </div>
        <div>
          <span className='aspect-initial' value={release * 100}>
            R
          </span>
          <input type='range' id='release' max='500' onChange={updateADSR} />
        </div>
      </div>
      <div className='value-displays'>
        <div className='attack-val'>{attack.toFixed(2)}</div>
        <div className='decay-val'>{decay.toFixed(2)}</div>
        <div className='sustain-val'>{sustain.toFixed(2)}</div>
        <div className='release-val'>{release.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ADSRController;
