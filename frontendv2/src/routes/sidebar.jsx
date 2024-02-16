/** Icons are imported separatly to reduce build time */

import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'

import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'

import React from 'react'

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '/app/booking', // url
    icon: <InboxArrowDownIcon className={iconClasses}/>, // icon component
    name: 'Booking', // name that appear in Sidebar
  },
  {
    path: '/app/activities', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Activities', // name that appear in Sidebar
  }
  
]

export default routes


