import React from "react";

const Navbarsign = () => {
  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center p-4">
      <div className="navbar-logo">
        <img src="logo.png" alt="Logo" className="h-8" />{" "}
      </div>
      <ul className="flex gap-4">
        <li>
          <a href="/admingigs" className="hover:text-gray-300">
            Gigs
          </a>
        </li>
        <li>
          <a href="/adminbookings" className="hover:text-gray-300">
            Bookings
          </a>
        </li>
        <li>
          <a href="/adminpayments" className="hover:text-gray-300">
            Payments
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbarsign;
