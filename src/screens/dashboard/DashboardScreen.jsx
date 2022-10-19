import React from 'react';
import { /* Navigate ,*/ Route, Routes } from "react-router-dom";
import Sidebar from '../../components/sidebar/Sidebar';
import User from './sidescreen/user/User';
import './DashboardScreen.scss'
import Contracts from './sidescreen/contracts/Contracts';
import ContractDetails from './sidescreen/contracts/ContractDetails';

const DashboardScreen = () => {
  return (
    <div className="dashboardContainer">
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className='sidescreen'>
        <TopBar/>
        <Routes>
          {/* <Route path="/dashboard" element={}/>
          <Route path="/billing" element={}/>
          <Route path="/market" element={}/> */}
          <Route path="/contracts" element={<Contracts/>}/>
          <Route path="/contracts/:id" element={<ContractDetails/>}/>
          <Route path="/user" element={<User/>}/>
        {/*  <Route path="/*" element={<h1>Wrong URL</h1>}/> */}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardScreen;