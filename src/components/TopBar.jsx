import moment from 'moment';
import React from 'react';

const TopBar = () => {
  const currentDate = moment().format('LL');
  return (
    <div className="fixed">
      <div className="relative flex items-center justify-center w-screen bg-appBar h-14 print:bg-none">
        <h1 className="text-4xl font-extrabold text-light print:text-black print:font-semibold print:text-xl">
          Akshar Vidya Griha{' '}
          <span className="hidden print:inline">- Date:{currentDate}</span>
        </h1>
      </div>
    </div>
  );
};

export default TopBar;
