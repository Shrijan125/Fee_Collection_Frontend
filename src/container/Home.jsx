import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import { Route, Routes } from 'react-router-dom';
import TodaysCollection from '../components/TodaysCollection';
import GenerateDues from '../components/GenerateDues';
import GenerateCollection from '../components/GenerateCollection';
import StudentDetails from '../components/StudentDetails';
import AddStudent from '../components/AddStudent';
import FeeStructure from '../components/FeeStructure';
import UpdateFee from '../components/UpdateFee';
import GeneratedDues from '../components/GeneratedDues';
import GeneratedCollection from '../components/GeneratedCollection';
import FeeCollection from '../components/FeeCollection';
import BulkAddStudent from '../components/BulkAddStudent';
import DressDetails from '../components/Dress/DressDetails';
import UpdateDress from '../components/Dress/UpdateDress';
import BulkUpdate from '../components/Dress/BulkUpdate';
import CollectPayment from '../components/Dress/CollectPayment';

const Home = () => {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <div className="h-full">
      <TopBar handleClick={handleClick} visible={visible}></TopBar>
      <div className="flex">
        <SideBar visible={visible}></SideBar>
        <Routes>
          <Route path="/*" element={<FeeCollection />}></Route>
          <Route path="/uniformDetails" element={<DressDetails />}></Route>
          <Route
            path="/todayscollection"
            element={<TodaysCollection></TodaysCollection>}
          ></Route>
          <Route
            path="/generatedues"
            element={<GenerateDues></GenerateDues>}
          ></Route>
          <Route
            path="/generatecollection"
            element={<GenerateCollection></GenerateCollection>}
          ></Route>
          <Route
            path="/studentdetails"
            element={<StudentDetails></StudentDetails>}
          ></Route>
          <Route path="/addstudent" element={<AddStudent></AddStudent>}></Route>
          <Route
            path="/addBulkStudent"
            element={<BulkAddStudent></BulkAddStudent>}
          ></Route>
          <Route
            path="bulkUpdateDress"
            element={<BulkUpdate></BulkUpdate>}
          ></Route>
          <Route path="/updateFee" element={<UpdateFee></UpdateFee>}></Route>
          <Route
            path="/updateUniform"
            element={<UpdateDress></UpdateDress>}
          ></Route>
          <Route
            path="/feestructure"
            element={<FeeStructure></FeeStructure>}
          ></Route>
          <Route
          path='/collectDressPayment' element={<CollectPayment></CollectPayment>}></Route>
          <Route
            path="/generatedDues"
            element={<GeneratedDues></GeneratedDues>}
          ></Route>
          <Route
            path="/generatedCollection"
            element={<GeneratedCollection></GeneratedCollection>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
