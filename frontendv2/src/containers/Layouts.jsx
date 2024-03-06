import React from 'react'
import PageContents from './pages/Pagecontent'
import LeftSidebar from '../pages/components/Leftsidebar'

function Layouts() {
  return (
    <>
        { /* Left drawer - containing page content and side bar (always open) */ }
        
        <div className="drawer  lg:drawer-open">
            <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
            <LeftSidebar/>
            <PageContents/>

            
        </div>

        
    </>
  )
}

export default Layouts