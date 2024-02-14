import React from 'react'
import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import { useParams } from 'react-router-dom';
function Header() {
  const { pageTitle } = useParams();
  const { pathname } = useLocation();

  // Extract the last part of the pathname as pageTitle
  const pathParts = pathname.split('/');
  const lastPathPart = pathParts[pathParts.length - 1];
  const displayTitle = (pageTitle || lastPathPart);
  const capitalizedTitle = displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1);
  // console.log(capitalizedTitle);
  function logoutUser(){
      localStorage.clear();
      window.location.href = '/';
  }
  return (
    <>
      <div class='navbar sticky top-0 bg-base-100 z-10 shadow-md'>
        <div class="flex-1">
          <label for="left-sidebar-drawer" class="btn btn-primary drawer-button lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-5 inline-block w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg></label><h1 class="text-2xl font-semibold ml-2">{capitalizedTitle}</h1></div>
          <div class="flex-none">
          <button class="btn btn-ghost ml-4  btn-circle"><div class="indicator"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path></svg><span class="indicator-item badge badge-secondary badge-sm">15</span></div></button>
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" alt="profile" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li className="justify-between">
                <Link to={'/app/settings-profile'}>Profile Settings<span className="badge">New</span></Link>
              </li>
              <li className=''><Link to={'/app/settings-billing'}>Bill History</Link></li>
              <div className="divider mt-0 mb-0"></div>
              <li><a onClick={logoutUser}>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header