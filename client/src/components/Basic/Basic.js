import React, { useEffect } from 'react';
import './Basic.scss';

const Basic = () => {
  const actx = new AudioContext();
  const osc1 = actx.createOscillator();
  const osc2 = actx.createOscillator();
  const gain1 = actx.createGain();
  const gain2 = actx.createGain();

  gain1.gain.value = 0.5;
  gain2.gain.value = 0.5;

  const oscMasterGain1 = actx.createGain();
  const filter1 = actx.createBiquadFilter();
  const compressor = actx.createDynamicsCompressor();

  osc1.connect(gain1);
  osc2.connect(gain2);

  //   compressor.connect(gain1);

  gain1.connect(oscMasterGain1);
  gain2.connect(oscMasterGain1);

  oscMasterGain1.connect(filter1);
  filter1.connect(compressor);
  compressor.connect(actx.destination);

  const changeFilter1Type = e => {
    filter1.type = e.target.value;
  };
  const changeFilter1Freq = e => {
    filter1.frequency.setValueAtTime(e.target.value, actx.currentTime);
  };
  const changeFilter1Q = e => {
    filter1.Q.setValueAtTime(e.target.value, actx.currentTime);
  };

  const changePitch1 = e => {
    const newVal = +e.target.value + 200;
    osc1.frequency.linearRampToValueAtTime(newVal, actx.currentTime + 0.1);
  };
  const changePitch2 = e => {
    const newVal = +e.target.value + 200;
    osc2.frequency.linearRampToValueAtTime(newVal, actx.currentTime + 0.1);
  };

  const mixGain = e => {
    gain1.gain.setValueAtTime((100 - e.target.value) / 100, actx.currentTime);
    gain2.gain.setValueAtTime(e.target.value / 100, actx.currentTime);
  };

  const changeOscMasterGain1 = e => {
    oscMasterGain1.gain.linearRampToValueAtTime(
      e.target.value / 100,
      actx.currentTime
    );
  };

  const changeWaveTable1 = e => {
    osc1.type = e.target.value;
  };

  const changeWaveTable2 = e => {
    osc2.type = e.target.value;
  };

  let startedUp = false;
  const startUp = () => {
    if (!startedUp) {
      osc1.start();
      osc2.start();
      startedUp = true;
    }
  };

  return (
    <>
      <div className='osc'>
        osc 1
        <div>
          wavetable
          <select onChange={changeWaveTable1}>
            <option value='sine'>sine</option>
            <option value='sawtooth'>sawtooth</option>
            <option value='triangle'>triangle</option>
            <option value='square'>square</option>
          </select>
        </div>
        <div>
          change pitch 1<input type='range' onChange={changePitch1}></input>
        </div>
      </div>

      <div className='osc'>
        osc 2
        <div>
          wavetable
          <select onChange={changeWaveTable2}>
            <option value='sine'>sine</option>
            <option value='sawtooth'>sawtooth</option>
            <option value='triangle'>triangle</option>
            <option value='square'>square</option>
          </select>
        </div>
        <div>
          change pitch 2<input type='range' onChange={changePitch2}></input>
        </div>
      </div>

      <div className='filter1'>
        filter one
        <select onChange={changeFilter1Type}>
          <option value='lowpass'>lowpass</option>
          <option value='highpass'>highpass</option>
          <option value='lowshelf'>lowshelf</option>
          <option value='highshelf'>highshelf</option>
          <option value='bandpass'>bandpass</option>
          <option value='allpass'>allpass</option>
          <option value='notch'>notch</option>
        </select>
        <div>
          frequency
          <input type='range' max='1000' onChange={changeFilter1Freq} />
        </div>
        <div>
          Q
          <input type='range' onChange={changeFilter1Q} />
        </div>
      </div>

      <div className='osc-master'>
        osc master
        <div>
          mix gain 1 and 2<input type='range' onChange={mixGain}></input>
        </div>
        <div>
          master vol<input type='range' onChange={changeOscMasterGain1}></input>
        </div>
        <button onClick={startUp}>start up</button>
      </div>
    </>
  );
};

export default Basic;
