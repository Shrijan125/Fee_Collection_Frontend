import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './container/Login';
import Home from './container/Home';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/*" element={<Home></Home>}></Route>
      </Routes>
    </div>
  );
};

export default App;
