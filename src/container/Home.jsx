import React from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import { Route, Routes } from 'react-router-dom';
import FeeCollection from '../components/FeeCollection';
import TodaysCollection from '../components/TodaysCollection';
import GenerateDues from '../components/GenerateDues';
import GenerateCollection from '../components/GenerateCollection';
import StudentDetails from '../components/StudentDetails';
import AddStudent from '../components/AddStudent';
import GenerateStudentList from '../components/GenerateStudentList';
import FeeStructure from '../components/FeeStructure';
import UpdateFee from '../components/UpdateFee';

const Home = () => {
  return (
    <div>
      <TopBar></TopBar>
      <div className="flex">
        <SideBar></SideBar>

        <Routes>
          <Route path="/*" element={<FeeCollection />}></Route>
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
            path="/generatestudentlist"
            element={<GenerateStudentList></GenerateStudentList>}
          ></Route>
          <Route path="/updateFee" element={<UpdateFee></UpdateFee>}></Route>
          <Route
            path="/feestructure"
            element={<FeeStructure></FeeStructure>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
