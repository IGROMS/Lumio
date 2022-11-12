import React, { useState } from 'react';
import { MdClear, MdNotificationsActive, MdNotificationsNone, MdNotificationsOff } from 'react-icons/md';
import { useNotificationCenter } from "react-toastify/addons/use-notification-center"
import Popup from 'reactjs-popup';
import './NotificationsWidget.scss'

const NotificationsWidget = () => {
  const { notifications, remove } = useNotificationCenter()
  const [isOpen, setIsOpen] = useState(false)
  console.log(notifications)
  return (
    <div className='notification-popup'>
      <Popup 
      trigger={
        notifications.length ?
        <div className='topbar-logo-container empty'><MdNotificationsActive className='logo' onClick={() => setIsOpen(!isOpen)}/></div> :
        <div className='topbar-logo-container'><MdNotificationsNone className='logo' onClick={() => setIsOpen(!isOpen)}/></div>
      }
      className={notifications.length ? '' : 'empty'}
      on='hover'
      mouseLeaveDelay={150}
      mouseEnterDelay={50}
      contentStyle={{ padding: '15px', border: 'red' }}
      >
      {notifications.length ? 
        <div className='notifications'>
          {notifications.map(notification => {
            console.log(notifications)
            if (notification.read) {
              return null
            }
          return <div className='notification'>{notification.content} 
              <button className='notificationButton' onClick={() => remove(notification.id)}><MdClear /></button> 
            </div>
          })}
        </div>
      : <div className='notifications'>
          <p className='notification'>You have no notifications!</p>
        </div>}
      </Popup>
    </div>
  );
};

export default NotificationsWidget;