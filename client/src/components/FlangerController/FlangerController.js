import React, { useState } from 'react';
import './FlangerController.scss';

const FlangerController = ({ changeFlanger1, initVals }) => {
  const [display, setDisplay] = useState(initVals);

  const updateFlanger1 = (e) => {
    const { id, value } = e.target;
    changeFlanger1(id, value);
    setDisplay({ ...display, [id]: value });
  };
  return (
    <div className='flanger'>
      <h2 className='center'>flanger</h2>
      {Object.keys(display).map((value) => {
        return (
          <div className='center' key={value}>
            <div>
              <b>{value}: </b> {display[value]}
            </div>

            <input
              type='range'
              id={value}
              value={display[value]}
              onChange={updateFlanger1}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FlangerController;
