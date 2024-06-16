import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBarMenu = ({ label, routePath }) => {
  const isActiveStyle =
    'flex items-center justify-center w-full h-20 border-b-2 border-appBar text-light hover:cursor-pointer hover:bg-slate-200 bg-inactive';
  const isNotActiveStyle =
    'flex items-center justify-center w-full h-20 border-b-2 border-appBar text-light hover:cursor-pointer hover:bg-slate-200 bg-none';
  return (
    <NavLink
      to={routePath}
      className={({ isActive }) =>
        isActive ? isActiveStyle : isNotActiveStyle
      }
    >
      <div>
        <h1 className="text-3xl font-semibold text-appBar">{label}</h1>
      </div>
    </NavLink>
  );
};

export default SideBarMenu;
