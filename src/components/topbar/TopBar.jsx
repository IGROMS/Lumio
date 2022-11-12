import React from 'react';
import './TopBar.scss'
import { MdMenu, MdSettings, MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSidebarContext } from '../../contexts/SidebarContext';
import NotificationsWidget from './notifications/NotificationsWidget';

const TopBar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

  const handleClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='top-bar'>
      <div className='topbar-logo-container'><MdMenu  className={`topbar-logo menu-toggle ${isSidebarOpen ? 'sidebar-open' : ''}`} onClick={handleClick}/></div>
      <div className={`utilities ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className='topbar-logo-container'><MdSettings  className='topbar-logo'/></div>
        <div className='topbar-logo-container notification-icon'><NotificationsWidget /></div>
        <div className='topbar-logo-container'><Link to={"/user"}><MdAccountCircle className='topbar-logo'/></Link></div>
      </div>  
    </div>
  );
};

export default TopBar;