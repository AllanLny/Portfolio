import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About.jsx';
import Navbar from './components/Navbar/Navbar';
import Contact from './pages/Contact';
import AppleAbstractBg from './components/Background/AppleAbstractBg';
import './styles/globals.scss';

function ScrollToTopOnNavigation() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    // Scroll sur le body ET sur le container principal
    window.scrollTo(0, 0);
    const main = document.querySelector('.content-wrapper');
    if (main) main.scrollTop = 0;
  }, [pathname]);
  return null;
}
 
export default function App() {
  return (
    <BrowserRouter>
      <AppleAbstractBg />
      <Navbar />
      <ScrollToTopOnNavigation />
      <main className="content-wrapper" style={{ color: 'white' }}>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
       </main>
     </BrowserRouter>
   );
 }
