// import React, { useState, useEffect } from 'react';
// import Audio from 'Audio';

// const Oscillator1 = () => {
//   const [masterGainValue, setMasterGainValue] = useState(0.1);
//   const [vol, setVol] = useState(0);
//   const [OSC, setOSC] = useState(null);
//   const [gainNode, setGainNode] = useState(null);
//   const ACTX = Audio.context;

//   const initializeMasterGain = () => {
//     // Connect the masterGainNode to the audio context to allow it to output sound.
//     Audio.masterGainNode.connect(Audio.context.destination);
//     // Set masterGain Value to 0
//     Audio.masterGainNode.gain.setValueAtTime(0, Audio.context.currentTime);

//     var oscillator = ACTX.createOscillator();
//     setOSC(oscillator);
//     oscillator.type = 'sawtooth';
//     oscillator.frequency.value = 61.63;
//     let gainNode = ACTX.createGain();
//     gainNode.gain.value = vol;
//     setGainNode(gainNode);
//     oscillator.start(0);
//     oscillator.connect(ACTX.destination);

//     // const oscillatorGainNode = Audio.context.createGain();
//     // oscillatorGainNode.gain.setValueAtTime(0, Audio.context.currentTime);
//     // oscillatorGainNode.connect(Audio.masterGainNode);
//   };

//   useEffect(initializeMasterGain, []);

//   const changeGain = e => {
//     console.log('E: ', e.target.value);
//     console.log('OSC FROM INIT: ', OSC);
//     const stateCopy = OSC;

//     setVol(e.target.value / 100);
//   };
//   //   useEffect(() => {
//   //     // let g = ACTX.createGain();
//   //     // g.gain.value = vol;

//   //     OSC.gain.setValueAtTime(vol / 100, ACTX.currentTime);
//   //   }, [vol]);

//   const play = () => {
//     Audio.masterGainNode.gain.setTargetAtTime(
//       masterGainValue,
//       Audio.context.currentTime,
//       0.001
//     );
//   };

//   // Fade out the MasterGainNode gain value to 0 on mouseDown by .001 seconds
//   const pause = () => {
//     Audio.masterGainNode.gain.setTargetAtTime(
//       0,
//       Audio.context.currentTime,
//       0.001
//     );
//   };

//   return (
//     <>
//       <div className='input'>
//         gain
//         <input value={vol * 100} onChange={changeGain} id='vol' type='range' />
//       </div>
//       <div className='input'>
//         pitch
//         <input
//           //   value={vol * 100}
//           //   onChange={e => {
//           //     setVol(e.target.value / 100);
//           //   }}
//           id='vol'
//           type='range'
//         />
//       </div>
//       <button onClick={play}>play</button>
//       <button onClick={pause}>pause</button>
//     </>
//   );
// };

// export default Oscillator1;
