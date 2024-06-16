import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      type="button"
      className="p-3 mt-5 text-2xl font-bold transition-all duration-300 delay-150 border rounded-md hover:ease-in-out border-appBar hover:cursor-pointer hover:bg-light hover:border-appBar hover:text-appBar bg-appBar text-light"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
