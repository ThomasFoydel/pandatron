// import React, { useState } from 'react';
// import './PingPongController.scss';

// const PingPongController = ({effectName, initVals, changePingPongController }) => {
//   const [display, setDisplay] = useState(initVals);

//   const update = (e) => {
//     const { id, value } = e.target;
//     changeQuadrafuzz(id, value / 100);
//     setDisplay({ ...display, [id]: value });
//   };

//   const updatePingPongController = (e) => {
//     changePingPongController(e.target.value);
//   };
//   return <div>
//       <h2>{effectName}</h2>
//       {initVals.map(parameter =>
//       <>
//       <h6>{parameter}</h6>
//       <input type="range" onChange={update}  value={display[parameter]} />

//       </>
//       )}
//   </div>;
// };

// export default PingPongController;
