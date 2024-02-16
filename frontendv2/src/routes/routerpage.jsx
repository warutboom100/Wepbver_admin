import React from 'react'
import Dashboard from '../pages/Dashboard'
import Booking from '../pages/Booking'
import Activities from '../pages/Activities'

const routes = [

  { path: "/app/dashboard", element: <Dashboard /> },
  { path: "/app/booking", element: <Booking /> },
  { path: "/app/activities", element: <Activities /> },

];


export default routes