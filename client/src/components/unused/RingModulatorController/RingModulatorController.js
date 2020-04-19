import React, { useState } from 'react';
import './RingModulatorController.scss';
const RingModulatorController = ({ changeRingModulator, initVals }) => {
  const [display, setDisplay] = useState(initVals);

  const updateRingModulator = (e) => {
    const { id, value } = e.target;
    changeRingModulator(id, value);
    setDisplay({ ...display, [id]: value });
  };
  return (
    <div className='ringmod'>
      <h2 className='center'>Ring Mod</h2>
      {Object.keys(display).map((setting) => {
        return (
          <div key={setting}>
            <div>
              <b>{setting}: </b>
              {display[setting]}
            </div>
            <input
              id={setting}
              type='range'
              value={display[setting]}
              onChange={updateRingModulator}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RingModulatorController;
