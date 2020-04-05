import React, { useState } from 'react';
// import Oscillator from 'components/Oscillator/Oscillator';
// import Oscillator1 from 'components/Oscillator1';
// import Audio from 'Audio';
import Basic from 'components/Basic/Basic';

function App() {
  // const [ACTX, setACTX] = useState(new window.AudioContext());
  return (
    <div className='App'>
      <h1>hello world</h1>
      {/* <Oscillator /> */}
      <Basic />
      {/* <Oscillator1 ACTX={ACTX} /> */}
    </div>
  );
}

export default App;
