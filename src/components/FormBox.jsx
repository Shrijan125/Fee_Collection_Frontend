import React from 'react';

const FormBox = ({
  label,
  value,
  setField,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col items-start justify-center mt-3 sm:mt-5">
      <label
        className={`sm:text-2xl font-bold text-light whitespace-nowrap`}
        htmlFor={label}
      >
        {label} {required && <span>*</span>}
      </label>
      <input
        disabled={disabled}
        className="w-full p-3 text-sm font-bold border rounded-md outline-none sm:text-xl text-appBar border-appBar disabled:bg-inactive"
        name={label}
        required={required}
        type="text"
        value={value}
        onChange={e => {
          setField(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default FormBox;
