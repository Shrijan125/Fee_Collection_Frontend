import React, { useState } from 'react';
import FormBox from '../components/FormBox';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submitHandler() {
    setLoading(true);
    await auth.login({
      adminId,
      password,
      callback: () => navigate('/', { replace: true }),
    });
    setLoading(false);
  }

  return (
    <div className="relative flex items-center justify-center h-screen bg-dark print:hidden">
      <div className="flex flex-col">
        <FormBox
          label={'Admin ID'}
          value={adminId}
          setField={setAdminId}
        ></FormBox>
        <div className="flex flex-col items-start justify-center mt-5">
          <label className="text-2xl font-bold text-light" rel="adminPassword">
            Password
          </label>
          <input
            className="p-3 text-xl font-bold border rounded-md outline-none text-appBar border-appBar"
            type="password"
            name="adminPassword"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        {loading ? (
          <div className="flex justify-center mt-5">
            {' '}
            <ClipLoader color="#F9F7F7" className="flex justify-center" />
          </div>
        ) : (
          <Button text={'Login'} onClick={submitHandler}></Button>
        )}
      </div>
    </div>
  );
};

export default Login;
