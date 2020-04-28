import React from 'react';
import Basic from 'components/Basic/Basic';
import logo from 'imgs/logo/pandatronlogogradient.png';
import './App.scss';

function App() {
  return (
    <div>
      <div className='space'></div>
      <Basic />
      <img className='synthname' src={logo} alt='logo' />
    </div>
  );
}

export default App;
