import React, { useState } from 'react';
import './ReverbController.scss';
import { Knob } from 'react-rotary-knob';

const ReverbController = ({
  changeReverbDecay,
  changeReverbDuration,
  mixReverbGain,
  initVals: { decayVal, durationVal, reverse, mixGain },
}) => {
  let decayTimesSeven = decayVal * 7;
  let initDecay = decayTimesSeven.toFixed(0);
  let durationTimesSeven = durationVal * 7;
  let initDuration = durationTimesSeven.toFixed(0);

  const [decay, setDecay] = useState(initDecay);
  const [duration, setDuration] = useState(durationVal * 7);
  const [isReversed, setIsReverse] = useState(reverse);
  const [mix, setMix] = useState(mixGain.toFixed(2));

  const updateDecay = (e) => {
    const newVal = +e.target.value;

    changeReverbDecay((newVal / 7).toFixed(0));
    setDecay(newVal.toFixed(0));
  };

  const updateDuration = (e) => {
    const newVal = +e.target.value;
    changeReverbDuration((newVal / 7).toFixed(0));
    setDuration(newVal.toFixed(0));
  };

  const updateMix = (e) => {
    mixReverbGain(e.toFixed(0));
    setMix(e.toFixed(2));
  };

  return (
    <div className='reverb'>
      <h2 className='center title'>reverb</h2>

      <div className='slider-input'>
        <div className='display'>
          <b>time</b> {duration}
        </div>

        <input
          type='range'
          value={duration}
          min={7.0}
          onChange={updateDuration}
        />
      </div>

      <div className='slider-input'>
        <div className='display'>
          <b>decay</b> {decay}
        </div>
        <input type='range' value={decay} max={100} onChange={updateDecay} />
      </div>
      <div>
        <div className='center'>
          <b>mix</b>
        </div>

        <Knob
          className='center knob'
          style={{ display: 'inline-block' }}
          min={0}
          max={100}
          value={mix}
          unlockDistance={10}
          onChange={updateMix}
        />

        <div className='center'>{mix}</div>
      </div>
    </div>
  );
};

export default ReverbController;
