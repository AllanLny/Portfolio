import React, { useRef, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {
  const [ovalStyle, setOvalStyle] = useState({});
  const navRefs = [useRef(), useRef(), useRef()];
  const location = useLocation();

  useEffect(() => {
    const activeIdx = ["/", "/about", "/contact"].findIndex(
      (path) => location.pathname === path
    );
    const ref = navRefs[activeIdx]?.current;
    if (ref) {
      const rect = ref.getBoundingClientRect();
      const parentRect = ref.parentNode.parentNode.getBoundingClientRect();
      setOvalStyle({
        left: rect.left - parentRect.left + rect.width / 2,
        width: rect.width + 24,
        height: rect.height + 8,
        transition: 'all 0.35s cubic-bezier(.22,.9,.31,1)'
      });
    }
  }, [location.pathname]);

  return (
    <nav className="navbar navbar--glass" role="navigation" aria-label="Navigation principale">
      <div
        className="nav-glass-oval"
        style={{
          position: 'absolute',
          top: '50%',
          left: ovalStyle.left || '50%',
          width: ovalStyle.width || 120,
          height: ovalStyle.height || 48,
          transform: 'translate(-50%, -50%)',
          transition: ovalStyle.transition
        }}
      />
      <div className="nav-glass-specular"></div>
      <div className="nav-inner">
        <ul className="nav-list">
          <li>
            <NavLink
              to="/"
              end
              ref={navRefs[0]}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              ref={navRefs[1]}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              À propos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              ref={navRefs[2]}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}