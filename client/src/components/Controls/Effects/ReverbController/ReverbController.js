import React, { useState } from 'react';
import './ReverbController.scss';
import { Knob } from 'react-rotary-knob';

const ReverbController = ({
  changeReverbDecay,
  changeReverbDuration,
  mixReverbGain,
  initVals: { decayVal, durationVal, reverse, mixGain },
}) => {
  const [decay, setDecay] = useState(decayVal * 7);
  const [duration, setDuration] = useState(durationVal * 7);
  const [isReversed, setIsReverse] = useState(reverse);
  const [mix, setMix] = useState(mixGain.toFixed(0));

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
    setMix(e.toFixed(0));
  };

  return (
    <div className='reverb'>
      <h2 className='center'>reverb</h2>
      <div className='slider-input'>
        <div className='display'>
          <b>decay</b> {decay}
        </div>
        <input type='range' value={decay} max={100} onChange={updateDecay} />
      </div>

      <div className='slider-input'>
        <div className='display'>
          <b>duration</b> {duration}
        </div>

        <input
          type='range'
          value={duration}
          min={1}
          onChange={updateDuration}
        />
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
