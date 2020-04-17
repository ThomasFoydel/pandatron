import React, { useState } from 'react';
import './QuadrafuzzController.scss';

const QuadrafuzzController = ({ changeQuadrafuzz, initVals }) => {
  const [display, setDisplay] = useState(initVals);
  const updateQuadrafuzz = (e) => {
    const { id, value } = e.target;
    changeQuadrafuzz(id, value / 100);
    setDisplay({ ...display, [id]: value });
  };
  const { lowGain, midLowGain, midHighGain, highGain, mix } = display;
  return (
    <div>
      <h2>quadrafuzz</h2>

      <h6>low</h6>
      <input
        type='range'
        id='lowGain'
        value={lowGain}
        onChange={updateQuadrafuzz}
      />
      <h6>mid low</h6>
      <input
        type='range'
        id='midLowGain'
        value={midLowGain}
        onChange={updateQuadrafuzz}
      />
      <h6>mid high</h6>
      <input
        type='range'
        id='midHighGain'
        value={midHighGain}
        onChange={updateQuadrafuzz}
      />
      <h6>high</h6>
      <input
        type='range'
        id='highGain'
        value={highGain}
        onChange={updateQuadrafuzz}
      />
      <h6>mix</h6>
      <input type='range' id='mix' value={mix} onChange={updateQuadrafuzz} />
    </div>
  );
};

export default QuadrafuzzController;
