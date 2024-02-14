import React, { lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';

import checkAuth from './routes/auth';

// Importing pages
const Layout = lazy(() => import('./containers/Layouts'))
const Login = lazy(() => import('./pages/Login'))

const token = checkAuth()

export default function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />
          
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/login"} replace />}/>

        </Routes>
      </Router>
    </>
    
  ) ;
}
