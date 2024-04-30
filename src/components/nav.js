import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center p-4">
      <div className="navbar-logo">
        <img src="logo.png" alt="Logo" className="h-8" /> {/* Adjust the height as needed */}
      </div>
      <ul className="flex gap-4">
        <li><a href="/" className="hover:text-gray-300">Home</a></li>
        <li><a href="/about" className="hover:text-gray-300">About</a></li>
        <li><a href="/services" className="hover:text-gray-300">Services</a></li>
        <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
        <li><a href="/signup" className="hover:text-gray-300">SignUp</a></li>
        <li><a href="/signin" className="hover:text-gray-300">SignIn</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
