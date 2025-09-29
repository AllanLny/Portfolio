import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {
  const navRefs = [useRef(), useRef(), useRef()];

  return (
    <>
      <div className="navbar-mobile-gradient" />
      <nav className="navbar navbar--glass" role="navigation" aria-label="Navigation principale">
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
    </>
  );
}