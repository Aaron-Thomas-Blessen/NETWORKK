import React from 'react';
import { useUser } from '../Context/Context';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

const getProfilePictureUrl = async (userId) => {
  const storage = getStorage();
  let imageUrl;

  try {
    const userProfilePicRef = ref(storage, 'profilePictures/' + userId);
    imageUrl = await getDownloadURL(userProfilePicRef);
  } catch (error) {
    // If no profile picture, use default
    const defaultPicRef = ref(storage, 'gs://network-c70d4.appspot.com/ProfilePic.jpeg'); // Adjust path as needed
    imageUrl = await getDownloadURL(defaultPicRef);
  }

  return imageUrl;
};


const handleLogout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log("User logged out successfully");
    // Additional actions upon successful logout if necessary
  }).catch((error) => {
    console.error("Logout failed", error);
  });
};


const Navbar = () => {
  const { user } = useUser();
  const [profilePicUrl, setProfilePicUrl] = useState('');

  useEffect(() => {
    if (user) {
      getProfilePictureUrl(user.uid)
        .then(url => {
          setProfilePicUrl(url);
        })
        .catch(error => {
          console.error('Error fetching profile picture:', error);
          // Set to default manually if needed or handled inside getProfilePictureUrl
        });
    }
  }, [user]);  // Dependency array ensures this effect runs when user state changes

  const userLinks = () => (
    <>
      <li><a href="/search" className="hover:text-gray-300">Search</a></li>
      <li><a href="/bookings" className="hover:text-gray-300">Bookings</a></li>
      <li>
        <Link to="/userProfilePage" className="hover:text-gray-300">
          {user.username}
          <img src={profilePicUrl} alt="Profile" className="h-8 inline"/>
        </Link>
      </li>
      <li><a href="/notifications" className="hover:text-gray-300"><i className="icon-notification"></i></a></li>
      <li><a onClick={handleLogout} className="cursor-pointer hover:text-gray-300">Logout</a></li>
    </>
  );

  const serviceProviderLinks = () => (
    <>
      <li><a href="/gigs" className="hover:text-gray-300">Gigs</a></li>
      <li><a href="/bookings" className="hover:text-gray-300">Bookings</a></li>
      <li><a href="/history" className="hover:text-gray-300">History</a></li>
      <li>
        <Link to="/SellerProfilePage" className="hover:text-gray-300">
          {user.username}
          <img src={profilePicUrl} alt="Profile" className="h-8 inline"/>
        </Link>
      </li>
      <li><a href="/notifications" className="hover:text-gray-300"><i className="icon-notification"></i></a></li>
      <li><a onClick={handleLogout} className="cursor-pointer hover:text-gray-300">Logout</a></li>
    </>
  );

  const renderLinks = () => {
    if (!user) {
      return (
        <>
          <li><a href="/signup" className="hover:text-gray-300">SignUp</a></li>
          <li><a href="/signin" className="hover:text-gray-300">SignIn</a></li>
        </>
      );
    } else {
      return user.isUser ? userLinks() : serviceProviderLinks();
    }
  };

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center p-4">
      <div className="navbar-logo">
        <img src="logo.png" alt="Logo" className="h-8" />
      </div>
      <ul className="flex gap-4">
        {renderLinks()}
      </ul>
    </nav>
  );
};

export default Navbar;



/*
const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center p-4">
      <div className="navbar-logo">
        <img src="logo.png" alt="Logo" className="h-8" />
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
*/
