import React from 'react';
import { /* Navigate ,*/ Route, Routes } from "react-router-dom";
import Sidebar from '../../components/sidebar/Sidebar';
import User from './sidescreen/user/User';
import './DashboardScreen.scss'
import Contracts from './sidescreen/contracts/Contracts';
import ContractDetails from './sidescreen/contracts/ContractDetails';
import TopBar from '../../components/topbar/TopBar';
import Market from './sidescreen/market/Market';
import ContractCreate from './sidescreen/contracts/ContractCreate';
import TicketCreate from './sidescreen/market/tickets/TicketCreate';

const DashboardScreen = () => {
  return (
    <div className="dashboardContainer">
      <div className="sidebar off-screen">
        <Sidebar/>
      </div>
      <div className='sidescreen full-width'>
        <TopBar/>
        <div className='sidescreen-content'>
          <Routes>

            {/* <Route path="/dashboard" element={}/>
            <Route path="/billing" element={}/> */}

            {/* TICKETS */}

            <Route path="/market" element={<Market />}/>
            <Route path="/tickets/create" element={<TicketCreate/>}/>

            {/* CONTRACTS */}

            <Route path="/contracts" element={<Contracts/>}/>
            <Route path="/contracts/create" element={<ContractCreate/>}/>
            <Route path="/contracts/:id" element={<ContractDetails/>}/>

            {/* MISC */}

            <Route path="/user" element={<User/>}/>
            <Route path="/*" element={<h1>Wrong URL</h1>}/>

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;