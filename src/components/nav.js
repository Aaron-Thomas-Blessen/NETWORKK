import React from 'react';
import { useUser } from '../Context/Context';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'; 
import { ref } from 'firebase/storage';
import { storage } from '../Firebase/Firebase';

const getUserData = async (userId) => {
  const db = getFirestore();
  const userDocRef = doc(db, 'users', userId);
  const userDocSnapshot = await getDoc(userDocRef);
  return userDocSnapshot.data();
};

const Navbar = () => {
  const { user } = useUser();
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then(userData => {
          if (userData.profilePicture) {
            setProfilePicUrl(userData.profilePicture);
          } else {
            // If no profile picture, use default
            const url = 'https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/ProfilePic.jpeg?alt=media&token=3e6a4919-4c75-4c15-b1bb-8ab6be94feac';
            setProfilePicUrl(url); // Adjust default URL as needed
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [user]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("User logged out successfully");
      navigate("/");
      // Additional actions upon successful logout if necessary
    }).catch((error) => {
      console.error("Logout failed", error);
    });
  };

  const userLinks = () => (
    <>
    <li><a href="/" className="hover:text-gray-300">Home</a></li>
      <li><a href="/search" className="hover:text-gray-300">Search</a></li>
      <li><a href="/showBookings" className="hover:text-gray-300">Bookings</a></li>
      <li>
        <Link to="/userProfilePage" className="hover:text-gray-300">
          Profile
        </Link>
      </li>
      <li><a onClick={handleLogout} className="cursor-pointer hover:text-gray-300">Logout</a></li>
    </>
  );

  const serviceProviderLinks = () => (
    <>
    <li><a href="/" className="hover:text-gray-300">Home</a></li>
      <li><a href="/showSellerBookings" className="hover:text-gray-300">Bookings</a></li>
      <li><a href="/history" className="hover:text-gray-300">History</a></li>
      <li>
        <Link to="/SellerProfilePage" className="hover:text-gray-300">
          Profile
        </Link>
      </li>
      <li><a onClick={handleLogout} className="cursor-pointer hover:text-gray-300">Logout</a></li>
    </>
  );

  const renderLinks = () => {
    if (!user) {
      return (
        <>
          <li><Link to="/" className="hover:text-gray-800">Home</Link></li>
          <li><Link to="/signup" className="hover:text-gray-800">SignUp</Link></li>
          <li><Link to="/signin" className="hover:text-gray-800">SignIn</Link></li>
        </>
      );
    } else {
      return user.isUser ? userLinks() : serviceProviderLinks();
    }
  };

  return (
    <nav className="bg-gray-400  text-gray-900 flex justify-between items-center p-4">
      <div className="navbar-logo w-1/2 p-0">
        <img src="https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Flogo-round.png?alt=media&token=0c9bc07f-39b2-4dcf-a547-8408e9ee2680" alt="Logo" className="w-16 h-24"  />
      </div>
      <ul className="flex gap-4">
        {renderLinks()}
      </ul>
    </nav>
  );
};

export default Navbar;




