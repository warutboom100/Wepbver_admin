
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./containers/Layouts"
export default function App() {
  return(
    <>
      <BrowserRouter>
      <Routes>
        
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
    </>
    
  ) ;
}
