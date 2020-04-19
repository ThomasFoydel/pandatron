import React, { useState } from 'react';
import { Knob } from 'react-rotary-knob';

import './EffectController.scss';

const EffectController = ({ effectName, initVals, changeEffect }) => {
  const [display, setDisplay] = useState(initVals);

  const update = (e) => {
    const { id, value } = e.target;
    changeEffect(id, value / 100);
    setDisplay({ ...display, [id]: value });
  };
  const minified = effectName === 'flanger' || effectName === 'quadrafuzz';
  return (
    <div className={`effect-controller minified-${minified}`}>
      <h2 className='name center'>{effectName}</h2>
      <div className='inputs-container'>
        {Object.keys(initVals).map((parameter) => {
          if (parameter === 'mix' || parameter === 'gain') {
            return (
              <div key={parameter}>
                <h6 className='center'>{parameter}</h6>
                <Knob
                  style={{ display: 'inline-block' }}
                  className='center knob'
                  min={0}
                  max={100}
                  value={display[parameter]}
                  unlockDistance={10}
                  onChange={(e) =>
                    update({ target: { id: parameter, value: e } })
                  }
                />
                <div className='center'>{display[parameter].toFixed(2)}</div>
              </div>
            );
          } else {
            return (
              <div key={parameter}>
                <div className='param-name center'>
                  <b>{parameter} </b>{' '}
                  <span className='val'>{display[parameter]}</span>
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
            );
          }
        })}
      </div>
    </div>
  );
};

export default EffectController;
