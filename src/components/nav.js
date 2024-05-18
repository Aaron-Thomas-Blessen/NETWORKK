import React, { useEffect, useState } from 'react';
import { useUser } from '../Context/Context';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const getUserData = async (userId) => {
  const db = getFirestore();
  const userDocRef = doc(db, 'users', userId);
  const userDocSnapshot = await getDoc(userDocRef);
  return userDocSnapshot.data();
};

const Navbar = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getUserData(user.uid).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [user]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  const userLinks = () => (
    <>
      <li className="px-4 py-2"><Link to="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
      <li className="px-4 py-2"><Link to="/search" className="hover:text-gray-300 transition-colors">Search</Link></li>
      <li className="px-4 py-2"><Link to="/showBookings" className="hover:text-gray-300 transition-colors">Bookings</Link></li>
      <li className="px-4 py-2"><Link to="/userProfilePage" className="hover:text-gray-300 transition-colors">Profile</Link></li>
      <li className="px-4 py-2 cursor-pointer hover:text-gray-300 transition-colors" onClick={handleLogout}>Logout</li>
    </>
  );

  const serviceProviderLinks = () => (
    <>
      <li className="px-4 py-2"><Link to="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
      <li className="px-4 py-2"><Link to="/showSellerBookings" className="hover:text-gray-300 transition-colors">Bookings</Link></li>
      <li className="px-4 py-2"><Link to="/history" className="hover:text-gray-300 transition-colors">History</Link></li>
      <li className="px-4 py-2"><Link to="/SellerProfilePage" className="hover:text-gray-300 transition-colors">Profile</Link></li>
      <li className="px-4 py-2 cursor-pointer hover:text-gray-300 transition-colors" onClick={handleLogout}>Logout</li>
    </>
  );

  const renderLinks = () => {
    if (!user) {
      return (
        <>
          <li className="px-4 py-2"><Link to="/" className="hover:text-gray-800 transition-colors">Home</Link></li>
          <li className="px-4 py-2"><Link to="/signup" className="hover:text-gray-800 transition-colors">SignUp</Link></li>
          <li className="px-4 py-2"><Link to="/signin" className="hover:text-gray-800 transition-colors">SignIn</Link></li>
        </>
      );
    } else {
      return user.isUser ? userLinks() : serviceProviderLinks();
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Flogo-round.png?alt=media&token=0c9bc07f-39b2-4dcf-a547-8408e9ee2680"
            alt="Logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <span className="ml-2 text-xl font-bold">networkk.</span>
        </div>
        <div className="hidden sm:flex sm:items-center sm:space-x-4 ml-auto">
          <ul className="flex space-x-4">{renderLinks()}</ul>
        </div>
        <div className="sm:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none ml-auto">
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col items-center space-y-4 mt-4">
          {renderLinks()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
