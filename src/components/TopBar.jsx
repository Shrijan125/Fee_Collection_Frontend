import { Menu, X } from 'lucide-react';
import React from 'react';

const TopBar = ({ handleClick, visible }) => {
  return (
    <div className="fixed z-50 flex items-center justify-around w-screen xl:justify-center bg-appBar h-14 print:hidden">
      {visible ? (
        <X className="xl:hidden text-light" onClick={handleClick}></X>
      ) : (
        <Menu className="xl:hidden text-light" onClick={handleClick}></Menu>
      )}
      <h1 className="text-3xl font-extrabold text-light sm:text-4xl whitespace-nowrap sm:px-0">
        Akshar Vidya Griha
      </h1>
    </div>
  );
};

export default TopBar;
