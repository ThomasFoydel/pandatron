import React, { useState, useEffect } from 'react';
import './Basic.scss';
import QwertyHancock from 'qwerty-hancock';
import oscClass from './oscClass';
import OscController from 'components/OscController/OscController';
import {
  makeDistortionCurve,
  impulseResponse,
  calcFreq,
} from '../../util/util';

const Basic = () => {
  const actx = new AudioContext();
  // const [attack, setAttack] = useState(1);
  // const [decay, setDecay] = useState(1);
  // const [sustain, setSustain] = useState(1);
  // const [release, setRelease] = useState(1);

  //OSCILLATOR SETTINGS
  let attack = 1;
  let decay = 1;
  let sustain = 1;
  let release = 1;
  let wavetable1 = 'sawtooth';
  let wavetable2 = 'sine';
  let osc1Detune = 0;
  let osc2Detune = 0;
  let osc1OctaveOffset = '0';
  let osc2OctaveOffset = '0';

  let oscGain1 = actx.createGain(0.5);
  let oscGain2 = actx.createGain(0.5);

  let delay1 = actx.createDelay(5.0);

  const distortion1 = actx.createWaveShaper();
  distortion1.curve = makeDistortionCurve(0, actx);

  const reverbMixGainWet = actx.createGain();
  const reverbMixGainDry = actx.createGain();
  reverbMixGainWet.gain.value = 0.3;
  reverbMixGainDry.gain.value = 0.7;

  const convolver1 = actx.createConvolver();
  let impulseBuffer = impulseResponse(4, 4, false, actx);
  convolver1.buffer = impulseBuffer;

  const oscMasterGain1 = actx.createGain();
  const filter1 = actx.createBiquadFilter();
  const compressor = actx.createDynamicsCompressor();

  oscGain1.connect(oscMasterGain1);
  oscGain2.connect(oscMasterGain1);
  oscMasterGain1.connect(distortion1);
  distortion1.connect(filter1);
  filter1.connect(compressor);

  compressor.connect(reverbMixGainDry);

  compressor.connect(delay1);
  delay1.connect(convolver1);

  convolver1.connect(reverbMixGainWet);

  reverbMixGainDry.connect(actx.destination);
  reverbMixGainWet.connect(actx.destination);

  const changeFilter1Type = (e) => {
    filter1.type = e.target.value;
  };
  const changeFilter1Freq = (e) => {
    filter1.frequency.setValueAtTime(e.target.value, actx.currentTime);
  };
  const changeFilter1Q = (e) => {
    filter1.Q.setValueAtTime(e.target.value, actx.currentTime);
  };

  const detuneOsc1 = (e) => {
    osc1Detune = +e.target.value;
  };
  const detuneOsc2 = (e) => {
    osc2Detune = +e.target.value;
  };

  const mixGain = (e) => {
    oscGain1.gain.setValueAtTime(
      (100 - e.target.value) / 100,
      actx.currentTime
    );
    oscGain2.gain.setValueAtTime(e.target.value / 100, actx.currentTime);
  };

  const mixReverbGain = (e) => {
    let newDryVal;
    if (e.target.value < 100) {
      newDryVal = (100 - e.target.value) / 100;
    } else {
      newDryVal = 0;
    }

    reverbMixGainDry.gain.setValueAtTime(
      newDryVal.toFixed(2),
      actx.currentTime
    );
    reverbMixGainWet.gain.setValueAtTime(
      e.target.value / 100,
      actx.currentTime
    );
  };

  const changeOscMasterGain1 = (e) => {
    oscMasterGain1.gain.linearRampToValueAtTime(
      e.target.value / 100,
      actx.currentTime
    );
  };

  const changeWaveTable1 = (e) => {
    wavetable1 = e.target.value;
  };

  const changeWaveTable2 = (e) => {
    wavetable2 = e.target.value;
  };

  const changeOctaveOsc1 = (e) => {
    osc1OctaveOffset = e.target.value;
  };

  const changeOctaveOsc2 = (e) => {
    osc2OctaveOffset = e.target.value;
  };

  const changeDistortion = (e) => {
    distortion1.curve = makeDistortionCurve(+e.target.value * 5, actx);
  };

  const changeConvolverReverb = (e) => {
    const newBuffer = impulseResponse(4, e.target.value, false, actx);
    convolver1.buffer = newBuffer;
  };

  const changeDelayTime = (e) => {
    const eventVal = +e.target.value / 20;
    delay1.delayTime.setValueAtTime(eventVal.toFixed(1), actx.currentTime);
  };

  // CREATE KEYBOARD
  useEffect(() => {
    const keyboard = new QwertyHancock({
      id: 'keyboard',
      width: 1000,
      height: 68,
      octaves: 4,
      startNote: 'C4',
      whiteKeyColour: 'black',
      blackKeyColour: 'white',
      activeColour: 'red',
    });
    let nodes = [];
    keyboard.keyDown = (note, freq) => {
      const envelope = { attack, decay, sustain, release };

      const osc1Freq = calcFreq(freq, osc1OctaveOffset);
      const osc2Freq = calcFreq(freq, osc2OctaveOffset);

      const newOsc1 = new oscClass(
        actx,
        wavetable1,
        osc1Freq,
        osc1Detune,
        envelope,
        oscGain1,
        freq
      );
      const newOsc2 = new oscClass(
        actx,
        wavetable2,
        osc2Freq,
        osc2Detune,
        envelope,
        oscGain2,
        freq
      );
      nodes.push(newOsc1, newOsc2);
    };
    keyboard.keyUp = (note, freq) => {
      var new_nodes = [];
      for (var i = 0; i < nodes.length; i++) {
        if (Math.round(nodes[i].initialFreq) === Math.round(freq)) {
          nodes[i].stop(0);
        } else {
          new_nodes.push(nodes[i]);
        }
      }
      nodes = new_nodes;
    };
  }, []);

  return (
    <>
      <OscController
        name='osc 1'
        changeWaveTable={changeWaveTable1}
        changeOctaveOsc={changeOctaveOsc1}
        detuneOsc={detuneOsc1}
      />
      <OscController
        name='osc 2'
        changeWaveTable={changeWaveTable2}
        changeOctaveOsc={changeOctaveOsc2}
        detuneOsc={detuneOsc2}
      />

      <div className='osc'>sub osc</div>

      <div className='osc'>noise osc</div>

      <div className='osc-master'>
        osc master
        <div>
          mix gain 1 and 2<input type='range' onChange={mixGain}></input>
        </div>
        <div>
          osc master gain
          <input type='range' onChange={changeOscMasterGain1}></input>
        </div>
      </div>

      <div className='osc'>
        <div>
          Attack{' '}
          <input
            type='range'
            max='500'
            onChange={(e) => (attack = +e.target.value / 100)}
          />
        </div>
        <div>
          Decay{' '}
          <input
            type='range'
            onChange={(e) => (decay = +e.target.value / 100)}
          />
        </div>
        <div>
          Sustain{' '}
          <input
            type='range'
            onChange={(e) => (sustain = +e.target.value / 100)}
          />
        </div>
        <div>
          Release{' '}
          <input
            type='range'
            onChange={(e) => (release = +e.target.value / 100)}
          />
        </div>
      </div>

      <div className='filter1'>
        <h2>filter one</h2>
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
      <div className='distortion'>
        distortion
        <input onChange={changeDistortion} type='range' />
      </div>

      <div className='delay'>
        <h2>delay</h2>
        time <input type='range' onChange={changeDelayTime} />
      </div>

      <div className='reverb'>
        <h2>reverb</h2>
        <span>duration</span>
        <div>
          <input type='range' onChange={changeConvolverReverb} />
        </div>
        <div>
          <span>dry/wet</span>
          <div>
            <input type='range' onChange={mixReverbGain} />
          </div>
        </div>
      </div>

      <div id='keyboard'></div>
    </>
  );
};

export default Basic;
