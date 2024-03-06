import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';

import routes from '../../routes/sidebar';

function LeftSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const iconClasses = 'w-6 h-6 mr-2'; // Define icon classes

  return (
    <>
      <div className={`drawer-side z-30 ${isOpen ? 'active' : ''}`}>
        <label htmlFor="left-sidebar-drawer" className={`drawer-overlay ${isOpen ? 'active' : ''}`}></label>
        <ul className={`menu pt-2 w-80 bg-base-100 min-h-full text-base-content ${isOpen ? 'open' : ''}`}>
          <button className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={toggleSidebar}>
            <XMarkIcon className="h-5 w-5 inline-block" />
          </button>
          <li className="mb-2 font-semibold text-xl">
            <Link to={'/dashboard'}>
              <img className="mask mask-squircle w-10" src="/Logo1.jpg" alt="DashWind Logo" />BVER
            </Link>
          </li>
          {routes.map((route, index) => (
            <li key={index}>
              <Link
                to={route.path}
                onClick={closeSidebar}
                className={`flex items-center py-2 px-4 ${location.pathname === route.path ? 'text-white' : 'text-base-content'}`}
              >
                {route.icon} {/* Render icon component */}
                <span className="ml-2">{route.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default LeftSidebar;
