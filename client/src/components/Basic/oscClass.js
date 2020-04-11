export default class oscClass {
  constructor(context, type, frequency) {
    this.context = context;
    this.osc = this.context.createOscillator();
    this.osc.type = type;
    this.osc.frequency.value = frequency;
    this.osc.start();
  }
  stop() {
    this.osc.stop();
  }
}

// import React from 'react'

// const oscClass = (actx) => {
//   const osc = actx.createOscillator();
//   const start = () => {
//     osc.start();
//   };
//   const stop = () => {
//     osc.stop();
//   };
//   return null;
// };

// export default oscClass;
