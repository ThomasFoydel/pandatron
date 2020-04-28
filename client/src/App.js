import React from 'react';
import Basic from 'components/Basic/Basic';
import logo from 'imgs/logo/pandatronlogogradient.jpg';
import './App.scss';
import preview from 'imgs/preview/pandatronpreview.png';
console.log('preview url: ', preview);

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
