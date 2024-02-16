// All components mapping with path for internal routes
import React from 'react'
import {
  createBrowserRouter,

  Navigate,

} from "react-router-dom";

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Booking from '../pages/Booking'
import Activities from '../pages/Activities'
import checkAuth from './auth';
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
const iconClasses = `h-6 w-6`;
const token = checkAuth();

const routes = createBrowserRouter([
  { path: "/login", element: <Login /> ,},
  { path: "/app/dashboard", element: <Dashboard /> , icon:<Squares2X2Icon className={iconClasses}/>, name: 'Dashboard'},
  { path: "/app/booking", element: <Booking /> , icon: <InboxArrowDownIcon className={iconClasses}/>, name: 'Booking'},
  { path: "/app/activities", element: <Activities /> , icon:<CurrencyDollarIcon className={iconClasses}/>, name: 'Activities'},
  { path: "*", element: <Navigate to={token ? "/app/dashboard" : "/login"} replace /> }
]);


export default routes
