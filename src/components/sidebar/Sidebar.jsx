import React from 'react';
import { logout } from '../../store/AccessTokenStore';
import SidebarButton from './button/SidebarButton';
import './Sidebar.scss'
import { MdLogout, MdSpaceDashboard, MdAssignment, MdCreditCard } from 'react-icons/md'
import { BsArrowLeftRight } from 'react-icons/bs'

const Sidebar = () => {
  const handleLogOut = () => {logout()}

  return (
    <aside className="container">
      <div className='logo-container'>
        <img className='dashboard-logo' src='https://lumio.solar/wp-content/uploads/2021/02/Recurso-2@2x.png' alt='Lumio Logo'/>
      </div>
      <div className="buttons">
        <ul className="dashboardButtons">
          <li><SidebarButton route={"/"}><div className='sidebar-button'><MdSpaceDashboard/><p>Dashboard</p></div></SidebarButton></li>
          <li><SidebarButton route={"/contracts"}><div className='sidebar-button'><MdAssignment/><p>Contracts</p></div></SidebarButton></li>
          <li><SidebarButton route={"/market"}><div className='sidebar-button'><BsArrowLeftRight/><p>Market</p></div></SidebarButton></li>
        </ul>
        <ul className="userButtons">
          <li><a href='null' onClick={handleLogOut}><div className='sidebar-button'><MdLogout/><p>Logout</p></div></a></li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;