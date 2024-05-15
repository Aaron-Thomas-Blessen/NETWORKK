import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';

const Navbarsign = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log('User signed out');
       navigate('/');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <nav className="bg-gray-400 text-gray-900 flex justify-between items-center p-4">
      <div className="navbar-logo w-1/2 p-0">
        <img src="https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Flogo-round.png?alt=media&token=0c9bc07f-39b2-4dcf-a547-8408e9ee2680" alt="Logo" className="w-16 h-24" />
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
              <button onClick={handleSignOut} className="cursor-pointer hover:text-gray-300">
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
