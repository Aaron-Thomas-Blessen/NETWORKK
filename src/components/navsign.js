import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const getAdminData = async (adminId) => {
  const db = getFirestore();
  const adminDocRef = doc(db, 'admins', adminId);
  const adminDocSnapshot = await getDoc(adminDocRef);
  return adminDocSnapshot.data();
};

const Navbarsign = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminState = localStorage.getItem('isAdmin');
    if (adminState === 'true') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getAdminData(user.uid).catch((error) => {
        console.error('Error fetching admin data:', error);
      });
    }
  }, [user]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem('isAdmin');
        setIsAdmin(false);
        navigate('/');
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  const renderAdminLinks = () => (
    <>
      <li className="px-4 py-2 text-lg"><Link to="/admingigs" className="hover:text-gray-300 transition-colors">Gigs</Link></li>
      <li className="px-4 py-2 text-lg"><Link to="/adminbookings" className="hover:text-gray-300 transition-colors">Bookings</Link></li>
      <li className="px-4 py-2 text-lg"><Link to="/adminpayments" className="hover:text-gray-300 transition-colors">Payments</Link></li>
      <li className="px-4 py-2 text-lg cursor-pointer hover:text-gray-300 transition-colors" onClick={handleLogout}>Logout</li>
    </>
  );

  const renderLinks = () => {
    if (!isAdmin) {
      return (
        <>
          <li className="px-4 py-2 text-lg"><Link to="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
          <li className="px-4 py-2 text-lg"><Link to="/signin" className="hover:text-gray-300 transition-colors">Sign In</Link></li>
        </>
      );
    } else {
      return renderAdminLinks();
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

export default Navbarsign;
