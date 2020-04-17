import React, { useState } from 'react';
import './Distortion2Controller.scss';
const Distortion2Controller = ({ changeDistortion2Gain, initVal }) => {
  const [displayGain, setDisplayGain] = useState(initVal);

  const updateDistortion2Gain = (e) => {
    const newVal = +e.target.value / 100;
    changeDistortion2Gain(newVal.toFixed(2));
    setDisplayGain(newVal.toFixed(2));
  };
  console.log('display gain: ', displayGain);
  console.log('type? :', typeof displayGain);
  return (
    <div className='distortion2'>
      <h6 className='center'>distortion II</h6>
      <div className='center value-display'>
        <b>gain: </b>
        {(displayGain * 100).toFixed(2)}
      </div>
      <input
        className='center'
        type='range'
        value={displayGain * 100}
        onChange={updateDistortion2Gain}
      />
    </div>
  );
};

export default Distortion2Controller;
