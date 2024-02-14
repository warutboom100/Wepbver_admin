import React from 'react'
import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import XMarkIcon  from '@heroicons/react/24/outline/XMarkIcon'
import routes from '../routes/sidebar'
import SidebarSubmenu from './SidebarSubmenu';
function LeftSidebar() {
  const location = useLocation();
  const close = (e) => {
    document.getElementById('left-sidebar-drawer').click();
  }
  return (
    <>
    <div className="drawer-side  z-30  ">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
      <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
        <button class="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-5 inline-block w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button>
        <li className="mb-2 font-semibold text-xl"><Link to={'/app/'}><img className="mask mask-squircle w-10" src="/logo192.png" alt="DashWind Logo"/>BVER</Link></li>
        {
          routes.map((route, k) => {
            return(
              <li className="" key={k}>
                  {
                      route.submenu ? 
                          <SidebarSubmenu {...route}/> : 
                      (<NavLink
                          end
                          to={route.path}
                          className={({isActive}) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                             {route.icon} {route.name}
                              {
                                  location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                  aria-hidden="true"></span>) : null
                              }
                      </NavLink>)
                  }
                  
              </li>
          )
          })
        }
      </ul>
    </div>
    </>
  )
}

export default LeftSidebar