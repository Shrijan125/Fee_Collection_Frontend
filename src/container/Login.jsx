import React, { useState } from 'react';
import FormBox from '../components/FormBox';
import Button from '../components/Button';
import axios from 'axios';
import { BASE_URL } from '../api/adminRequests';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submitHandler() {
    setLoading(true);
    if (!adminId || !password || adminId == '' || password == '') {
      toast.error('Both Fields are requried', { position: 'top-right' });
      setLoading(false);
      return;
    }
    const url = BASE_URL + '/admin/login';
    try {
      const { data } = await axios.post(
        url,
        { adminId, password },
        { withCredentials: true }
      );
      localStorage.setItem('user', data);
      navigate('/', { replace: true });
      setLoading(false);
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 409) {
        toast.error('Admin does not exist.', { position: 'top-right' });
      } else if (statusCode === 401) {
        toast.error('Invalid Password', { position: 'top-right' });
      } else if (statusCode === 404) {
        toast.error('All fields are required', { position: 'top-right' });
      } else {
        toast.error('Something went wrong', { position: 'top-right' });
      }
    }
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
      <Toaster />
    </div>
  );
};

export default Login;
