import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/nav-profile.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/admin" className="navbar-brand">
          <img src={logo} alt="CrickArt Logo" className="nav-logo" />
          <span>CrickArt Admin</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
