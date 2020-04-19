import React, { useState } from 'react';
import './EffectController.scss';

const EffectController = ({ effectName, initVals, changeEffect }) => {
  const [display, setDisplay] = useState(initVals);

  const update = (e) => {
    const { id, value } = e.target;
    changeEffect(id, value / 100);
    setDisplay({ ...display, [id]: value });
  };

  return (
    <div className='effect-controller'>
      <h2 className='name center'>{effectName}</h2>
      <div className='inputs-container'>
        {Object.keys(initVals).map((parameter) => (
          <div key={parameter}>
            <div className='param-name center'>
              <b>{parameter}: </b> {display[parameter]}
            </div>
            <input
              className='input center'
              type='range'
              id={parameter}
              onChange={update}
              min={0}
              max={parameter.max || 100}
              value={display[parameter]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EffectController;
