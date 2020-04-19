import React, { useState } from 'react';
import './PingPongController.scss';

const PingPongController = ({ initVals, changePingPongController }) => {
  const [display, setDisplay] = useState(initVals);
  const updatePingPongController = (e) => {
    changePingPongController(e.target.value);
  };
  return <div></div>;
};

export default PingPongController;
