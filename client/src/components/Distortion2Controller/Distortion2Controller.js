import React from 'react';
import './Distortion2Controller.scss';
const Distortion2Controller = ({ changeDistortion2Gain, initVal }) => {
  const updateDistortion2Gain = (e) => {
    const newVal = +e.target.value / 100;
    console.log('new valu: ', newVal);
    changeDistortion2Gain(newVal);
  };
  return (
    <div>
      <input type='range' onChange={updateDistortion2Gain} />
    </div>
  );
};

export default Distortion2Controller;
