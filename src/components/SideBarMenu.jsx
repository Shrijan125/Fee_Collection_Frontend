import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBarMenu = ({ label, routePath, Icon }) => {
  const isActiveStyle =
    'flex items-center justify-start  pl-8 w-full h-14 whitespace-nowrap  text-light hover:cursor-pointer hover:bg-slate-200 bg-inactive';
  const isNotActiveStyle =
    'flex items-center justify-start w-full pl-8 h-14 whitespace-nowrap  text-light hover:cursor-pointer hover:bg-slate-200 bg-none';
  return (
    <NavLink
      to={routePath}
      className={({ isActive }) =>
        isActive ? isActiveStyle : isNotActiveStyle
      }
    >
      <div className="flex gap-3">
        {Icon && <Icon className="text-appBar" />}
        <h1 className="font-semibold text-appBar">{label}</h1>
      </div>
    </NavLink>
  );
};

export default SideBarMenu;
