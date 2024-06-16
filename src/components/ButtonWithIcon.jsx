import React from 'react';

const ButtonWithIcon = ({label,value,setValue,onClickHandler,src}) => {
  return (
    <div className="flex flex-col items-start justify-center mt-5">
      <form>
        <label htmlFor="search" className="text-2xl font-bold text-light">
          {label}
        </label>
        <div className="relative">
          <div className="absolute flex items-center start-0"></div>
          <input
            type="text"
            id="search"
            className="p-3 text-xl font-bold border rounded-md outline-none text-appBar border-appBar"
            onChange={e => setValue(e.target.value)}
            value={value}
          />
          <button
            type="button"
            className=" hover:bg-slate-300 hover:rounded-md absolute end-2.5 bottom-2.5 px-4 py-2 hover:cursor-pointer transition-all duration-300 delay-150 hover:ease-in-out"
            onClick={onClickHandler}
          >
            <img
              src={src}
              alt="search_img"
              height={20}
              width={20}
            ></img>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ButtonWithIcon;
