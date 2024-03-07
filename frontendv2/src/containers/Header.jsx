import React, { useEffect, useState } from 'react';
import { NavLink, Routes, Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Header.css';
import telemedicine from '../assets/telemedicine.png';
import disabled from '../assets/disabled.png';
import partnership from '../assets/partnership.png';
import commit from '../assets/commit.png';
import profile from '../assets/profile.png';


function Header() {
  const { pageTitle } = useParams();
  const { pathname } = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [showNotification_yesterday, setShowNotification_yesterday] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [msg_alarm, setAsg_alarm] = useState(0);

  useEffect(() => {
    const getNotificationMessages = async () => {
      try {
        const response = await axios.patch(
          `https://ik25o0qwj7.execute-api.ap-southeast-1.amazonaws.com/wepapp_admin/WKa9BnJm-MovementEvent/msg_notification`,
          { action: "LOAD_MSG" }
        );

        setNotifications(response.data.body);
        setShowNotification_yesterday(response.data.body1);
        
      } catch (error) {
        console.error("Error fetching notification messages:", error);
      }
    };
    

    getNotificationMessages();

    const interval = setInterval(() => {
      getNotificationMessages();

      
    }, 5000);

    return () => {
      
      clearInterval(interval);
    };
  }, []);

  const toggleNotification = () => {
    if(showNotification){
      setAsg_alarm(notifications.length);
    }
    setShowNotification(!showNotification);
  };

  const clearNotifications = async () => {
    try {
      await axios.patch(
        `https://ik25o0qwj7.execute-api.ap-southeast-1.amazonaws.com/wepapp_admin/WKa9BnJm-MovementEvent/msg_notification`,
        { action: "CLEAR_MSG" }
      );

      setNotifications([]);
      setShowNotification_yesterday([]);
    } catch (error) {
      console.error("Error clearing notification messages:", error);
    }
  };

  const pathParts = pathname.split('/');
  const lastPathPart = pathParts[pathParts.length - 1];
  const displayTitle = (pageTitle || lastPathPart);
  const capitalizedTitle = displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1);

  function logoutUser() {
    localStorage.clear();
    window.location.href = '/';
  }
  
  return (
    
    <div>
      {showNotification && <NotificationDrawer notifications={notifications} notifications_yesterday={showNotification_yesterday} clearNotifications={clearNotifications} close={toggleNotification} />}

      <div className='navbar sticky top-0 bg-base-100 z-10 shadow-md'>
        <div className="flex-1">
          <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 inline-block w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
            </svg>
          </label>
          <h1 className="text-2xl font-semibold ml-2">{capitalizedTitle}</h1>
        </div>
        <div className="flex-none">
          <button className="btn btn-ghost ml-4 btn-circle" onClick={toggleNotification}>
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
              </svg>
              <span className="indicator-item badge badge-secondary badge-sm">{notifications.length-msg_alarm}</span>
            </div>
          </button>
          
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profile} alt="profile" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li className="justify-between">
                <Link to={'/'}>...<span className="badge">New</span></Link>
              </li>
              <li className=''><Link to={'/'}>...</Link></li>
              <div className="divider mt-0 mb-0"></div>
              <li><a onClick={logoutUser}>ออกจากระบบ</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;


function NotificationDrawer({ notifications, notifications_yesterday, clearNotifications, close }) {
  const [elapsedTimes, setElapsedTimes] = useState([]);
  const [elapsedTimes1, setElapsedTimes1] = useState([]);
  function getBackgroundColor(step) {
  
    switch (step) {
      case '1':
        return "bg-white";
      case '2':
        return "bg-blue-200";
      case '3':
        return "bg-green-200";
      case '4':
        return "bg-red-200";
      default:
        return "bg-white";
    }
  }
  const getColorImageURL = (step) => {
    let imageURL;
    switch(step) {
      case '1':
        imageURL = telemedicine;
        break;
      case '2':
        imageURL = disabled;
        break;
      case '3':
        imageURL = partnership;
        break;
      case '4':
        imageURL = commit;
        break;
    }
    return imageURL;
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const updatedElapsedTimes = notifications.map(item => {
        const timestamp = new Date(item.Timestamp);
        const difference = now - timestamp; // Difference in milliseconds
        const minutesElapsed = Math.floor(difference / (1000 * 60)); // Convert to minutes
        return minutesElapsed;
      });
      const updatedElapsedTimes1 = notifications_yesterday.map(item => {
        const timestamp = new Date(item.Timestamp);
        const difference = now - timestamp; // Difference in milliseconds
        const minutesElapsed = Math.floor(difference / (1000 * 60)); // Convert to minutes
        return minutesElapsed;
      });
      setElapsedTimes(updatedElapsedTimes);
      setElapsedTimes1(updatedElapsedTimes1);
    }, 1000); // Update every second

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [notifications]);

  return (
    <div className="fixed inset-0 z-50 flex bg-black bg-opacity-50 justify-end">
      <div className="bg-gray-100 dark:bg-gray-800 w-11/12 sm:w-1/3 lg:w-2/6 rounded-lg p-8 shadow-lg overflow-y-auto">
        <div className="inline-flex items-center justify-between w-full">
          <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">แจ้งเตือน</h3>
          <button onClick={close} className="inline-flex text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded font-medium shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-blue-500 hover:text-white hover:-translate-y-1 hover:scale-110 dark:text-gray-800 dark:hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Close
          </button>
        </div>
        <p className="mt-8 font-medium text-gray-500 text-sm sm:text-base dark:text-white">วันนี้</p>
        <div>
          {notifications.map((item, index) => (
            <div key={index} className={`mt-2 px-6 py-4 ${getBackgroundColor(item.Step)} rounded-lg shadow w-full`}>
              <div className="inline-flex items-center justify-between w-full">
                <div className="inline-flex items-center">
                  <img src={getColorImageURL(item.Step)} className="w-6 h-6 mr-3" />
                  <h3 className="font-bold text-base text-gray-800">{item.message_id.split(" ")[0]}</h3>
                </div>
                <p className="text-xs text-gray-500">{elapsedTimes[index]} minutes ago</p>
              </div>
              <p className="mt-1 text-sm">{item.msg}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-medium text-gray-500 text-sm sm:text-base dark:text-white">เมื่อวาน</p>
        <div>
          {notifications_yesterday.map((item, index) => (
            <div key={index} className={`mt-2 px-6 py-4 ${getBackgroundColor(item.Step)} rounded-lg shadow w-full`}>
              <div className="inline-flex items-center justify-between w-full">
                <div className="inline-flex items-center">
                  <img src={getColorImageURL(item.Step)} className="w-6 h-6 mr-3" />
                  <h3 className="font-bold text-base text-gray-800">{item.message_id.split(" ")[0]}</h3>
                </div>
                <p className="text-xs text-gray-500">{elapsedTimes1[index]} minutes ago</p>
              </div>
              <p className="mt-1 text-sm">{item.msg}</p>
            </div>
          ))}
        </div>
        <button onClick={clearNotifications} class="inline-flex text-sm bg-white justify-center px-4 py-2 mt-12 w-full text-red-500 items-center rounded font-medium
          shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-red-500
            hover:text-white hover:-translate-y-1 hover:scale-110 dark:hover:bg-white dark:text-gray-800 dark:hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 sm:mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          Clear all notifications
        </button>
      </div>
      
    </div>
  );
}




