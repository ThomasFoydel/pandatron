import React from 'react';

const OscController = ({
  changeWaveTable,
  changeOctaveOsc,
  detuneOsc,
  name,
}) => {
  return (
    <div className='osc'>
      <h2>{name}</h2>
      <div>
        wavetable
        <select onChange={changeWaveTable}>
          <option value='sine'>sine</option>
          <option value='sawtooth'>sawtooth</option>
          <option value='triangle'>triangle</option>
          <option value='square'>square</option>
        </select>
      </div>

      <div>
        octave
        <select onChange={changeOctaveOsc}>
          <option value='octaveTwoUp'>+2</option>
          <option value='octaveOneUp'>+1</option>
          <option value='octaveNone'>0</option>
          <option value='octaveOneDown'>-1</option>
          <option value='octaveTwoDown'>-2</option>
        </select>
      </div>
      <div>
        detune
        <input type='range' onChange={detuneOsc} />
      </div>
    </div>
  );
};

export default OscController;
