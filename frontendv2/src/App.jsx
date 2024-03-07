import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import checkAuth from './routes/auth';
import LeftSidebar from './pages/components/Leftsidebar';

// Importing pages
const Layout = lazy(() => import('./containers/Layouts'));
const Login = lazy(() => import('./pages/Login'));

const token = checkAuth();

const checkToken = (tokens) => {
  
  if (tokens === "DumyTokenHere") {
    
    return <Layout />;
  } else {
    
    return <Login />;
  }
};

export default function App() {
  return (
    <>
      <div className="App">
        {/* <Layout /> */}
        {checkToken(token)}
      </div>
    </>
  );
}
