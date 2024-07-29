import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './container/Login';
import Home from './container/Home';
import AuthProvider from './contexts/AuthContext';
import RequireAuth from './components/Auth/RequireAuth';
import { Toaster } from 'react-hot-toast';
import Test from './components/Test';

const App = () => {
  return (
    <AuthProvider>
      <div className="h-screen">
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/test" element={<Test></Test>}></Route>
          <Route
            path="/*"
            element={
              <RequireAuth>
                <Home></Home>
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </div>
      <Toaster />
    </AuthProvider>
  );
};

export default App;
