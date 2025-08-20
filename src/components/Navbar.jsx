import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {
  return (
    <nav className="navbar navbar--glass" role="navigation" aria-label="Navigation principale">
      <div className="nav-inner">
        <ul className="nav-list">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              À propos
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}