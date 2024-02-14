import {React,Suspense ,lazy} from 'react'
import Header from "./Header"
import routes from '../routes'
import { useEffect, useRef } from "react"
import { NavLink,  Routes, Link , useLocation, Route} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import SuspenseContent from "./SuspenseContent"



function PageContent() {
  const mainContentRef = useRef(null);
  const { pageTitle } = useParams();
  const { pathname } = useLocation();

  const pathParts = pathname.split('/');
  const lastPathPart = pathParts[pathParts.length - 1];
  const displayTitle = (pageTitle || lastPathPart);
  const capitalizedTitle = displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1);
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  return (
    <>
      <div className="drawer-content flex flex-col ">
          <Header/>
          <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200" ref={mainContentRef}>
            <Suspense fallback={<SuspenseContent />}>
              <Routes>
              {
                routes.map((route, key) => {
                  return(
                    <Route
                      key={key}
                      exact={true}
                      path={`${route.path}`}
                      element={<route.component />}
                    />
                  )
                })
              }
              </Routes>
            </Suspense>
            <div className="h-16"></div>
          </main>
      </div>
    </>
    
  )
}

export default PageContent