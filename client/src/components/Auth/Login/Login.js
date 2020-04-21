import React, { useState } from 'react';
import Axios from 'axios';
const Login = () => {
  const [userInfo, setUserInfo] = useState();

  const updateInfo = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  };
  const handleSubmit = async () => {
    const authResult = await Axios.post(
      'http://localhost:8000/auth/login',
      userInfo
    );
  };
  return (
    <div>
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

export default Login;
