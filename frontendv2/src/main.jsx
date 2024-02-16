import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import routes1 from './routes/index.jsx'
import {

  RouterProvider,
 
} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes1} />
  </React.StrictMode>,
)
