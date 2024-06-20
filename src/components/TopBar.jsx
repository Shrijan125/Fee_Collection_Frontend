import React from 'react';

const TopBar = () => {
  return (
    <div className="fixed">
      <div className="relative flex items-center justify-center w-screen bg-appBar h-14 print:hidden">
        <h1 className="text-4xl font-extrabold text-light ">
          Akshar Vidya Griha
        </h1>
      </div>
    </div>
  );
};

export default TopBar;
