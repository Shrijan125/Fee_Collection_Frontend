import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/adminRequests';
import toast from 'react-hot-toast';
const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const login = async ({ adminId, password, callback }) => {
    if (!adminId || !password) {
      toast.error('Both Fields are requried', { position: 'top-right' });
      return;
    }
    const url = BASE_URL + '/admin/login';
    try {
      const { data } = await axios.post(
        url,
        { adminId, password },
        { withCredentials: true }
      );
      localStorage.setItem('authenticated', data?.data?.adminName);
      setAdmin(data?.data?.adminName);
      callback();
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
  };
  const setUp = token => {
    setAdmin(token);
  };
  async function logout() {
    const url = `${BASE_URL}/admin/logout`;
    try {
      await axios.post(url, {}, { withCredentials: true });
      setAdmin(null);
      localStorage.clear();
    } catch (error) {
      toast.error('Logout Failed!', { position: 'top-right' });
    }
  }
  const value = { admin, login, setUp, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
