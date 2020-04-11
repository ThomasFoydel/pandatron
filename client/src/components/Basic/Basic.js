import React, { useEffect } from 'react';
import './Basic.scss';
// import block from 'IMreverbs/block.irs';
import QwertyHancock from 'qwerty-hancock';
// import example from './example';
import oscClass from './oscClass';

const Basic = () => {
  const actx = new AudioContext();
  console.log(QwertyHancock);
  useEffect(() => {
    // const keyboard = new QwertyHancock({
    //   id: 'keyboard',
    //   width: 600,
    //   height: 150,
    //   octaves: 2,
    // });

    const keyboard = new QwertyHancock({
      id: 'keyboard',
      width: 1000,
      height: 68,
      octaves: 5,
      startNote: 'C0',
      // whiteKeyColour: 'blue',
      // blackKeyColour: 'green',
      // hoverColour: '#f3e939',
    });
    keyboard.onKeyDown = () => {
      const newOsc = new oscClass(actx, 'sawtooth', 600);
    };
  }, []);

  // function getSample(url, cb) {
  //   var request = new XMLHttpRequest();
  //   request.open('GET', url);
  //   request.responseType = 'arraybuffer';
  //   request.onload = function () {
  //     actx.decodeAudioData(request.response, cb);
  //   };
  //   request.send();
  // }

  function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 0,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for (; i < n_samples; ++i) {
      x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  function impulseResponse(duration, decay, reverse) {
    var sampleRate = actx.sampleRate;
    var length = sampleRate * duration;
    var impulse = actx.createBuffer(2, length, sampleRate);
    var impulseL = impulse.getChannelData(0);
    var impulseR = impulse.getChannelData(1);

    if (!decay) decay = 2.0;
    for (var i = 0; i < length; i++) {
      var n = reverse ? length - i : i;
      impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
      impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    }
    return impulse;
  }

  const osc1 = actx.createOscillator();
  const osc2 = actx.createOscillator();
  const gain1 = actx.createGain();
  const gain2 = actx.createGain();

  let delay1 = actx.createDelay(5.0);

  const distortion1 = actx.createWaveShaper();
  distortion1.curve = makeDistortionCurve(0);

  const reverbMixGainWet = actx.createGain();
  const reverbMixGainDry = actx.createGain();
  reverbMixGainWet.gain.value = 0.3;
  reverbMixGainDry.gain.value = 0.7;

  const convolver1 = actx.createConvolver();
  let impulseBuffer = impulseResponse(4, 4, false);
  convolver1.buffer = impulseBuffer;

  gain1.gain.value = 0.5;
  gain2.gain.value = 0.5;

  const oscMasterGain1 = actx.createGain();
  const filter1 = actx.createBiquadFilter();
  const compressor = actx.createDynamicsCompressor();

  osc1.connect(gain1);
  gain1.connect(oscMasterGain1);

  osc2.connect(gain2);
  gain2.connect(oscMasterGain1);

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

  const changePitch1 = (e) => {
    const newVal = +e.target.value;
    osc1.frequency.linearRampToValueAtTime(newVal, actx.currentTime + 0.1);
  };
  const changePitch2 = (e) => {
    const newVal = +e.target.value;
    osc2.frequency.linearRampToValueAtTime(newVal, actx.currentTime + 0.1);
  };

  const mixGain = (e) => {
    gain1.gain.setValueAtTime((100 - e.target.value) / 100, actx.currentTime);
    gain2.gain.setValueAtTime(e.target.value / 100, actx.currentTime);
  };

  const mixReverbGain = (e) => {
    let newDryVal;
    if (e.target.value < 100) {
      // newDryVal = 1 - e.target.value / 100;
      newDryVal = (100 - e.target.value) / 100;
    } else {
      newDryVal = 0;
    }

    console.log('mixReverbGain, newDryVal: ', newDryVal.toFixed(2));
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
    osc1.type = e.target.value;
  };

  const changeWaveTable2 = (e) => {
    osc2.type = e.target.value;
  };

  const changeDistortion = (e) => {
    distortion1.curve = makeDistortionCurve(+e.target.value * 5);
  };

  const changeConvolverReverb = (e) => {
    const newBuffer = impulseResponse(4, e.target.value, false);
    convolver1.buffer = newBuffer;
  };

  const changeDelayTime = (e) => {
    const eventVal = +e.target.value / 20;
    console.log(eventVal);
    delay1.delayTime.setValueAtTime(eventVal.toFixed(1), actx.currentTime);
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
          change pitch 1
          <input type='range' max='10000' onChange={changePitch1}></input>
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
          change pitch 2
          <input type='range' max='1000' onChange={changePitch2}></input>
        </div>
      </div>

      <div className='filter1'>
        reverb duration
        <input type='range' onChange={changeConvolverReverb} />
        mix reverb gain
        <div>
          dry<input type='range' onChange={mixReverbGain}></input>wet
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
      <div>
        distortion
        <input onChange={changeDistortion} type='range' />
      </div>

      <div className='osc-master'>
        osc master
        <div>
          mix gain 1 and 2<input type='range' onChange={mixGain}></input>
        </div>
        <div>
          osc master gain
          <input type='range' onChange={changeOscMasterGain1}></input>
        </div>
        <button onClick={startUp}>start up</button>
      </div>

      <div className='delay'>
        delay <input type='range' onChange={changeDelayTime} />
      </div>

      <div id='keyboard'></div>
    </>
  );
};

export default Basic;
