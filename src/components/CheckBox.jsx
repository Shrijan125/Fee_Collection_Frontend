import React from 'react';

const CheckBox = ({ label, value, setField }) => {
  return (
    <div className="flex items-center justify-center mt-2">
      <label
        className="text-2xl font-bold text-light"
        rel="adminPassword"
        htmlFor="hostelFacility"
      >
        {label}
      </label>
      <input
        className="w-6 h-6 ml-3 bg-gray-100 border-gray-300 text-appBar rounded-8 focus:ring-appBar"
        type="checkbox"
        id="hostelFacility"
        name="hostelFacility"
        checked={value}
        onChange={() => setField(!value)}
      />
    </div>
  );
};

export default CheckBox;
