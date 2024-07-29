import { UserRoundSearch } from 'lucide-react';
import React from 'react';

const ButtonWithIcon = ({ label, value, setValue, onClickHandler, src }) => {
  return (
    <div className="flex flex-row items-center justify-center mt-3 sm:mt-5">
      <div className="flex flex-col w-5/6">
        <label
          htmlFor="search"
          className="font-bold sm:text-2xl text-light whitespace-nowrap"
        >
          {label}
        </label>
        <input
          type="text"
          id="search"
          className="p-3 text-sm font-bold border-l outline-none rounded-l-md border-y sm:text-xl text-appBar border-appBar"
          onChange={e => setValue(e.target.value)}
          value={value}
        />
      </div>
      <button
        type="button"
        className="sm:p-[14px] p-[10px] transition-all duration-300 delay-150 bg-light mt-6 sm:mt-8 w-min h-min rounded-r-md hover:bg-slate-300 hover:cursor-pointer hover:ease-in-out"
        onClick={onClickHandler}
      >
        <UserRoundSearch />
      </button>
    </div>
  );
};

export default ButtonWithIcon;
