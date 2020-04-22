import React, { useState } from 'react';
import Axios from 'axios';
import './Register.scss';

const Register = () => {
  const [userInfo, setUserInfo] = useState();

  const updateInfo = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  };
  const handleSubmit = async () => {
    const authResult = await Axios.post(
      'http://localhost:8000/auth/register',
      userInfo
    );
    console.log('auth result: ', authResult);
  };
  return (
    <div>
      <input onChange={updateInfo} type='text' id='name' placeholder='name' />
      <input onChange={updateInfo} type='text' id='email' placeholder='email' />
      <input
        onChange={updateInfo}
        type='password'
        id='password'
        placeholder='password'
      />
      <div onClick={handleSubmit}>submit</div>
    </div>
  );
};

export default Register;
