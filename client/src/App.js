import React from 'react';
import Basic from 'components/Basic/Basic';
import Register from 'components/Auth/Register/Register';
import './App.scss';

function App() {
  return (
    <div>
      <h1 className='synthname'>PANDATRON</h1>
      <Register />
      <Basic />
    </div>
  );
}

export default App;
