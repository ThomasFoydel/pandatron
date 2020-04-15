import React, { useState } from 'react';
import { Knob } from 'react-rotary-knob';

import waves from 'imgs/wavesIcons/index';
import './OscController.scss';

const OscController = ({
  changeWaveTable,
  changeOctaveOsc,
  detuneOsc,
  name,
  changeGain,
}) => {
  const [gainVal, setGainVal] = useState(0.5);
  const [wavetable, setWavetable] = useState('sine');

  const changeOscGain = (e) => {
    const newVal = e / 1000;
    setGainVal(newVal);
    changeGain(newVal);
  };

  const updateWavetable = (e) => {
    setWavetable(e.target.value);
    changeWaveTable(e);
  };
  return (
    <div className='osc'>
      <h2>{name}</h2>
      <div>
        wavetable
        <img
          className='osccontrol-wavetable-icon'
          src={waves[wavetable]}
          alt={`current wavetable: ${wavetable}`}
        />
        <select onChange={updateWavetable}>
          <option value='sine'>sine</option>
          <option value='sawtooth'>sawtooth</option>
          <option value='triangle'>triangle</option>
          <option value='square'>square</option>
        </select>
      </div>
      <div className='osccontrol-gain'>
        gain
        <Knob
          style={{ display: 'inline-block' }}
          min={0}
          max={1000}
          value={gainVal * 1000}
          unlockDistance={10}
          onChange={changeOscGain}
        />
      </div>
      <div className='osccontrol-octave'>
        octave
        <select onChange={changeOctaveOsc}>
          <option value={2}>+2</option>
          <option value={1}>+1</option>
          <option value={0}>0</option>
          <option value={-1}>-1</option>
          <option value={-2}>-2</option>
        </select>
      </div>
      {detuneOsc && (
        <div className='osccontrol-detune'>
          detune
          <input type='range' onChange={detuneOsc} />
        </div>
      )}
    </div>
  );
};

export default OscController;
