
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./containers/Layouts"
export default function App() {
  return(
    <>
      <BrowserRouter>
      <Routes>
        
        <Route path="/app/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
    </>
    
  ) ;
}
