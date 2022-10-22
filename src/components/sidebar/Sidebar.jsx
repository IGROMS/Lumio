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
      <h1>Lumio</h1>
      <div className="buttons">
        <ul className="dashboardButtons">
          <li><SidebarButton route={"/"}><div className='sidebar-button'><MdSpaceDashboard/><p>Dashboard</p></div></SidebarButton></li>
          <li><SidebarButton route={"/contracts"}><div className='sidebar-button'><MdAssignment/><p>Contracts</p></div></SidebarButton></li>
          <li><SidebarButton route={"/billing"}><div className='sidebar-button'><MdCreditCard/><p>Billing</p></div></SidebarButton></li>
          <li><SidebarButton route={"/market"}><div className='sidebar-button'><BsArrowLeftRight/><p>Market</p></div></SidebarButton></li>
        </ul>
        <ul className="userButtons">
          <li><a href='null' onClick={handleLogOut}><div className='sidebar-button'><MdLogout/>Logout</div></a></li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;