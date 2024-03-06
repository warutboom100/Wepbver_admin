import React from 'react'
import Dashboard from '../pages/Dashboard'
import Booking from '../pages/Booking'
import Activities from '../pages/Activities'
import Login from '../pages/Login'
const routes = [

  { path: "/dashboard", element: <Dashboard /> },
  { path: "/booking", element: <Booking /> },
  { path: "/activities", element: <Activities /> },
  { path: "/login", element: <Login /> },

];


export default routes