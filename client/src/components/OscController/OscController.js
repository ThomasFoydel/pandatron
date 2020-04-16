import React, { useState } from 'react';
import { Knob } from 'react-rotary-knob';
import DropDown from 'components/DropDown/DropDown';

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
  const [detuneVal, setDetuneVal] = useState(0);
  const [wavetable, setWavetable] = useState('sine');
  console.log();

  const changeOscGain = (e) => {
    const newVal = e / 1000;
    setGainVal(newVal);
    changeGain(newVal);
  };

  const updateWavetable = (e) => {
    e.target.value = e.target.id;
    setWavetable(e.target.value);
    changeWaveTable(e);
  };

  const updateDetune = (e) => {
    setDetuneVal(e / 10);
    detuneOsc(e / 10);
  };
  return (
    <div className='osccontrol'>
      <h2 className='name center'>{name}</h2>
      <div>
        {/* <img
          className='wavetable-icon center'
          src={waves[wavetable]}
          alt={`current wavetable: ${wavetable}`}
        /> */}
        <div className='wavetable-control'>
          <img
            onClick={updateWavetable}
            className={`wavetable-icon ${
              wavetable === 'sine' && 'current-wavetable'
            }`}
            src={waves['sine']}
            id='sine'
            alt={`sine ${wavetable === 'sine' && 'current wavetable'}`}
          />
          <img
            onClick={updateWavetable}
            className={`wavetable-icon ${
              wavetable === 'sawtooth' && 'current-wavetable'
            }`}
            src={waves['sawtooth']}
            id='sawtooth'
            alt={`sawtooth ${wavetable === 'sawtooth' && 'current wavetable'}`}
          />

          <img
            onClick={updateWavetable}
            className={`wavetable-icon ${
              wavetable === 'triangle' && 'current-wavetable'
            }`}
            src={waves['triangle']}
            id='triangle'
            alt={`triangle ${wavetable === 'triangle' && 'current wavetable'}`}
          />

          <img
            onClick={updateWavetable}
            className={`wavetable-icon ${
              wavetable === 'square' && 'current-wavetable'
            }`}
            src={waves['square']}
            id='square'
            alt={`square ${wavetable === 'square' && 'current wavetable'}`}
          />
        </div>
        {/* <div className='select-input center'>
          <select
            className='wavetable-select center'
            onChange={updateWavetable}
          >
            <option value='sine'>sine</option>
            <option value='sawtooth'>sawtooth</option>
            <option value='triangle'>triangle</option>
            <option value='square'>square</option>
          </select>
        </div> */}
        {/* <div className='select-input dropdown-container center'>
          <DropDown
            options={['sine', 'sawtooth', 'triangle', 'square']}
            updateFunction={updateWavetable}
            initVal={'sine'}
            inputId={'type'}
          />
        </div> */}
      </div>
      <div className='octave center'>
        <b>octave</b>
        <div className='select-input center'>
          <select onChange={changeOctaveOsc}>
            <option value={2}>+2</option>
            <option value={1}>+1</option>
            <option value={0}>0</option>
            <option value={-1}>-1</option>
            <option value={-2}>-2</option>
          </select>
        </div>
      </div>
      <div className={`flex${detuneOsc ? 'true' : 'false'} center`}>
        <div className='gain '>
          <div>
            <h3>gain</h3>

            {(gainVal * 1000).toFixed(2)}
          </div>
          <Knob
            style={{ display: 'inline-block' }}
            min={0}
            max={1000}
            value={gainVal * 1000}
            unlockDistance={10}
            onChange={changeOscGain}
          />
        </div>

        {detuneOsc && (
          <div className='detune'>
            <div>
              <h3>detune</h3>

              {detuneVal.toFixed(2)}
            </div>
            <Knob
              style={{ display: 'inline-block' }}
              min={-1000}
              max={1000}
              value={detuneVal * 10}
              unlockDistance={10}
              onChange={updateDetune}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OscController;
