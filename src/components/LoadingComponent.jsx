import React from 'react';
import { ClipLoader } from 'react-spinners';
const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-5 ">
      {' '}
      <ClipLoader color="#F9F7F7" className="flex justify-center" />
    </div>
  );
};

export default LoadingComponent;
