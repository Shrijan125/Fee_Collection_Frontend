import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
const DropDown = ({ item, visible, handleClick, name }) => {
  return (
    <div>
      <div
        className="flex items-center justify-start w-full pl-4 text-lg font-semibold border-b select-none h-14 whitespace-nowrap border-appBar hover:cursor-pointer hover:bg-slate-200 bg-none text-appBar"
        onClick={handleClick}
      >
        <div className="flex items-center justify-between w-full">
          {name}
          {visible ? <ChevronUp></ChevronUp> : <ChevronDown></ChevronDown>}
        </div>
      </div>
      {visible && (
        <ul>
          {item.map((element,index) => (
            <li key={index}>{element}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
