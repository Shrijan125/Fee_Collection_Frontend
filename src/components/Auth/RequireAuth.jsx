import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  const admin = localStorage.getItem('authenticated');
  useEffect(() => {
    if (admin) {
      auth.setUp(admin);
    }
  }, [admin, auth]);
  if (!auth.admin && !admin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
