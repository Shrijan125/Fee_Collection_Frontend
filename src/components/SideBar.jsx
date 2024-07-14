import React from 'react';
import SideBarMenu from './SideBarMenu';
import axios from 'axios';
import { BASE_URL } from '../api/adminRequests';
import toast, { Toaster } from 'react-hot-toast';

const SideBar = () => {
  async function handleClick() {
    const url = `${BASE_URL}/admin/logout`;
    try {
      await axios.post(url, {}, { withCredentials: true });
    } catch (error) {
      toast.error('Logout Failed!', { position: 'top-right' });
    }
  }
  return (
    <div>
      <div className="fixed flex flex-col h-full print:hidden w-96 bg-light top-14">
        <SideBarMenu label={'Home'} routePath={'/'}></SideBarMenu>
        <SideBarMenu
          label={"Today's Collection"}
          routePath={'/todayscollection'}
        ></SideBarMenu>
        <SideBarMenu
          label={'Generate Dues'}
          routePath={'/generatedues'}
        ></SideBarMenu>
        <SideBarMenu
          label={'Generate Collection'}
          routePath={'/generatecollection'}
        ></SideBarMenu>
        <SideBarMenu
          label={'Student Details'}
          routePath={'/studentdetails'}
        ></SideBarMenu>
        <SideBarMenu
          label={'Add Student'}
          routePath={'/addstudent'}
        ></SideBarMenu>
        <SideBarMenu
          label={'Bulk Student Upload'}
          routePath={'/addBulkStudent'}
        ></SideBarMenu>
        <SideBarMenu
          label={'Fee Structure'}
          routePath={'/feestructure'}
        ></SideBarMenu>
        <div
          className="absolute flex items-center justify-center w-full h-20 border-red-600 border-y-2 bottom-14 hover:cursor-pointer text-light hover:bg-red-300"
          onClick={handleClick}
        >
          <img
            src="/assets/log-out.png"
            alt="logout-img"
            className="mr-4 w-14 h-14"
          ></img>
          <h1 className="text-3xl font-semibold text-red-600">Logout</h1>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SideBar;
