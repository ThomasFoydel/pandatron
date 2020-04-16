import React, { useEffect } from 'react';
import './Basic.scss';
import QwertyHancock from 'qwerty-hancock';
import oscClass from './oscClass';
import noiseOscClass from './noiseOscClass';

import OscController from 'components/OscController/OscController';
import {
  makeDistortionCurve,
  impulseResponse,
  calcFreq,
} from '../../util/util';
import ADSRController from 'components/ADSRController/ADSRController';
import FilterController from 'components/FilterController/FilterController';
import NoiseOscController from 'components/NoiseOscController/NoiseOscController';

const Basic = () => {
  const actx = new AudioContext();

  //OSCILLATOR SETTINGS
  let attack = 1;
  let decay = 1;
  let sustain = 1;
  let release = 1;
  let initEnvelope = { attack, decay, sustain, release };

  let wavetable1 = 'sawtooth';
  let wavetable2 = 'sine';
  let subOscType = 'sine';
  let noiseType = 'white';

  let osc1Detune = 0;
  let osc2Detune = 0;
  let osc1OctaveOffset = '0';
  let osc2OctaveOffset = '0';

  let subOscOctaveOffset = '0';

  let subOscVol = 0;
  let noiseOscVol = 0;

  let subGain = actx.createGain();
  let oscGain1 = actx.createGain();
  let oscGain2 = actx.createGain();
  let noiseGain = actx.createGain();

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
  noiseGain.connect(distortion1);
  distortion1.connect(filter1);

  const subFilter = actx.createBiquadFilter();
  filter1.connect(compressor);
  subGain.connect(subFilter);
  subFilter.connect(compressor);

  compressor.connect(reverbMixGainDry);

  compressor.connect(delay1);
  delay1.connect(convolver1);

  convolver1.connect(reverbMixGainWet);

  reverbMixGainDry.connect(actx.destination);
  reverbMixGainWet.connect(actx.destination);

  const changeFilter1Type = (val) => {
    filter1.type = val;
  };
  const changeFilter1Freq = (val) => {
    filter1.frequency.setValueAtTime(val, actx.currentTime);
  };
  const changeFilter1Q = (val) => {
    filter1.Q.setValueAtTime(val, actx.currentTime);
  };

  const detuneOsc1 = (e) => {
    osc1Detune = e;
  };
  const detuneOsc2 = (e) => {
    osc2Detune = e;
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

  // const changeOscMasterGain1 = (e) => {
  //   oscMasterGain1.gain.linearRampToValueAtTime(
  //     e.target.value / 100,
  //     actx.currentTime
  //   );
  // };

  const changeWaveTable1 = (e) => {
    wavetable1 = e.target.value;
  };

  const changeWaveTable2 = (e) => {
    wavetable2 = e.target.value;
  };

  const changeWaveTableSub = (e) => {
    subOscType = e.target.value;
  };

  const changeNoiseType = (e) => {
    noiseType = e;
  };

  const changeOctaveOsc1 = (e) => {
    osc1OctaveOffset = e.target.value;
  };

  const changeOctaveOsc2 = (e) => {
    osc2OctaveOffset = e.target.value;
  };

  const changeOctaveSub = (e) => {
    subOscOctaveOffset = e.target.value;
  };

  const changeOsc1Gain = (e) => {
    oscGain1.gain.value = e;
  };
  const changeOsc2Gain = (e) => {
    oscGain2.gain.value = e;
  };

  const changeSubGain = (e) => {
    subGain.gain.value = e;
  };

  const changeNoiseGain = (e) => {
    noiseOscVol = e;
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

  const changeADSR = (newVal, aspect) => {
    if (aspect === 'attack') {
      attack = newVal;
    } else if (aspect === 'decay') {
      decay = newVal;
    } else if (aspect === 'sustain') {
      sustain = newVal;
    } else if (aspect === 'release') {
      release = newVal;
    }
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
      const subOscFreq = calcFreq(freq, subOscOctaveOffset - 1);

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

      const subOsc = new oscClass(
        actx,
        subOscType,
        subOscFreq,
        0,
        envelope,
        subGain,
        freq
      );

      const noiseOsc = new noiseOscClass(
        actx,
        noiseType,
        envelope,
        noiseGain,
        freq,
        noiseOscVol
      );
      nodes.push(newOsc1, newOsc2, subOsc, noiseOsc);
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
      <div className='main-grid'>
        <div className='main-grid-section-1'>
          <div className='flex'>
            <OscController
              name='osc 1'
              changeWaveTable={changeWaveTable1}
              changeOctaveOsc={changeOctaveOsc1}
              detuneOsc={detuneOsc1}
              changeGain={changeOsc1Gain}
            />
            <OscController
              name='osc 2'
              changeWaveTable={changeWaveTable2}
              changeOctaveOsc={changeOctaveOsc2}
              detuneOsc={detuneOsc2}
              changeGain={changeOsc2Gain}
            />
          </div>

          <div className='osc-mix center'>
            <div className='center inputcontainer'>
              <span className='oscname'>osc1</span>
              <input type='range' onChange={mixGain} />
              <span className='oscname'>osc2</span>
            </div>
          </div>

          <div className='flex'>
            <OscController
              name='sub osc'
              changeWaveTable={changeWaveTableSub}
              changeOctaveOsc={changeOctaveSub}
              changeGain={changeSubGain}
            />
            <NoiseOscController
              changeNoiseGain={changeNoiseGain}
              changeNoiseType={changeNoiseType}
              initGain={noiseOscVol}
            />
            {/* <div className='osc'>
              <h4>noise osc</h4>
              <div>
                <select
                  onChange={(e) => {
                    noiseType = e.target.value;
                  }}
                >
                  <option value='white'>white</option>
                  <option value='brown'>brown</option>
                  <option value='pink'>pink</option>
                </select>
              </div>
              <div>
                gain
                <input
                  type='range'
                  onChange={(e) => {
                    noiseOscVol = +e.target.value / 100;
                  }}
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className='main-grid-section-2'>
          <div className='section2-grid'>
            <div className='section2-grid-1'>
              <FilterController
                changeFilter1Type={changeFilter1Type}
                changeFilter1Freq={changeFilter1Freq}
                changeFilter1Q={changeFilter1Q}
                initParams={{
                  type: filter1.type,
                  frequency: filter1.frequency.value,
                  Q: filter1.Q.value,
                }}
              />
            </div>
            <div className='section2-grid-2'>
              <ADSRController
                changeADSR={changeADSR}
                initEnvelope={initEnvelope}
              />
            </div>
          </div>
          <div className='section2-grid-3'>SECTION2 GRID, AREA 3 GOES HERE</div>
        </div>
        <div className='main-grid-section-3'>
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
        </div>
        <div className='main-grid-section-4'>
          <div className='keyboard' id='keyboard'></div>
        </div>
      </div>
    </>
  );
};

export default Basic;
