import React, { useState } from 'react';
import SideBarMenu from './SideBarMenu';
import {
  ArchiveRestore,
  Banknote,
  BookUser,
  Coins,
  FileClock,
  Grid2X2,
  HandCoins,
  ReceiptIndianRupee,
  Shirt,
  UserRoundPen,
} from 'lucide-react';
import DropDown from './DropDown/DropDown';

const SideBar = ({ visible }) => {
  const [feevisible, setFeeVisible] = useState(false);
  const [stuVisible, setStuVisible] = useState(false);
  const [dressVisible, setdressVisible] = useState(false);
  const handleFee = () => {
    setFeeVisible(!feevisible);
  };
  const handleStudent = () => {
    setStuVisible(!stuVisible);
  };
  const handleDress = () => {
    setdressVisible(!dressVisible);
  };
  const Feeitems = [
    <SideBarMenu
      label={'Collect Fee'}
      routePath={'/'}
      Icon={ReceiptIndianRupee}
    ></SideBarMenu>,
    <SideBarMenu
      label={'Generate Dues'}
      routePath={'/generatedues'}
      Icon={FileClock}
    ></SideBarMenu>,
    <SideBarMenu
      label={"Today's Collection"}
      routePath={'/todayscollection'}
      Icon={Coins}
    ></SideBarMenu>,
    <SideBarMenu
      label={'Generate Collection'}
      routePath={'/generatecollection'}
      Icon={Banknote}
    ></SideBarMenu>,
    <SideBarMenu
      label={'Fee Structure'}
      routePath={'/feestructure'}
      Icon={Grid2X2}
    ></SideBarMenu>,
  ];

  const StudentItems = [
    <SideBarMenu
      label={'Add Student'}
      routePath={'/addstudent'}
      Icon={UserRoundPen}
    ></SideBarMenu>,
    <SideBarMenu
      label={'Bulk Student Upload'}
      routePath={'/addBulkStudent'}
      Icon={BookUser}
    ></SideBarMenu>,
  ];

  const DressItems = [
    <SideBarMenu
    label={'Collect Payment'}
    routePath={'/collectDressPayment'}
    Icon={HandCoins}
  ></SideBarMenu>,
    <SideBarMenu
      label={'Uniform Details'}
      routePath={'/uniformDetails'}
      Icon={Shirt}
    ></SideBarMenu>,
    <SideBarMenu
      label={'Bulk Update'}
      routePath={'/bulkUpdateDress'}
      Icon={ArchiveRestore}
    ></SideBarMenu>
  ];
  return (
    <div
      className={`fixed flex flex-col w-64 h-full overflow-y-auto ${visible ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0 print:hidden bg-light top-14 z-50`}
    >
      <DropDown
        visible={feevisible}
        item={Feeitems}
        handleClick={handleFee}
        name={'Account'}
      ></DropDown>
      <DropDown
        visible={stuVisible}
        item={StudentItems}
        handleClick={handleStudent}
        name={'Student'}
      ></DropDown>
      <DropDown
        visible={dressVisible}
        item={DressItems}
        handleClick={handleDress}
        name={'Uniform'}
      ></DropDown>
    </div>
  );
};

export default SideBar;
