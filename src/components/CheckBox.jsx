import React from 'react';

const CheckBox = ({ label, value, setField }) => {
  return (
    <div className="flex items-center justify-center mt-2">
      <label
        className="font-semibold select-none sm:text-2xl sm:font-bold text-light whitespace-nowrap"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="ml-3 bg-gray-100 border-gray-300 sm:w-6 sm:h-6 text-appBar focus:ring-appBar"
        type="checkbox"
        id={label}
        name={label}
        checked={value}
        onChange={() => setField(!value)}
      />
    </div>
  );
};

export default CheckBox;
