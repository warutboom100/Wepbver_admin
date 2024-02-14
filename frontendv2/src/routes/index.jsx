// All components mapping with path for internal routes
import React from 'react'
import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Booking = lazy(() => import('../pages/Booking'))
const Activities = lazy(() => import('../pages/Activities'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/booking', // the url
    component: Booking, // view rendered
  },
  {
    path: '/activities', // the url
    component: Activities, // view rendered
  },
  
]

export default routes
