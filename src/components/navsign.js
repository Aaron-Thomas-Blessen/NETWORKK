import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase/Firebase';

const Navbarsign = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center p-4">
      <div className="navbar-logo">
        <img src="logo.png" alt="Logo" className="h-8" />{' '}
      </div>
      <ul className="flex gap-4">
        {user ? (
          <>
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
            <li>
              <button onClick={handleSignOut} className="hover:text-gray-300">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <a href="/signin" className="hover:text-gray-300">
              Sign In
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbarsign;
