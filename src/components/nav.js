import React from 'react';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <ul className="nav-options">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div className="signup-button">
        <button>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
