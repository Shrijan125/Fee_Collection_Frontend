import React, { useState } from 'react';
import NavBar from './Navbar/NavBar';
import Drawer from './Drawer/Drawer';

const Test = () => {
  const handleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <div>
      <NavBar handleSideBar={handleSideBar}></NavBar>
      <Drawer sideBarOpen={sideBarOpen}></Drawer>
    </div>
  );
};

export default Test;
