import React from 'react';
import './Distortion2Controller.scss';
const Distortion2Controller = ({ changeDistortion2Gain, initVal }) => {
  const updateDistortion2Gain = (e) => {
    const newVal = +e.target.value / 100;
    changeDistortion2Gain(newVal);
  };
  return (
    <div className='distortion2'>
      <h6 className='center'>distortion II</h6>
      <input className='center' type='range' onChange={updateDistortion2Gain} />
    </div>
  );
};

export default Distortion2Controller;
