import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Navbar from '../../components/nav';
import { useUser } from '../../Context/Context';
import { db } from '../../Firebase/Firebase';

const getUserData = async (userId) => {
  const userRef = collection(db, 'users');
  const q = query(userRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  } else {
    return null;
  }
};

const MyGigs = () => {
  const { user } = useUser();
  const [userGigs, setUserGigs] = useState([]);

  useEffect(() => {
    const fetchUserGigs = async () => {
      try {
          const q = query(collection(db, 'services'), where('serviceProviderId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const gigsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUserGigs(gigsData);
      } catch (error) {
        console.error('Error fetching user gigs: ', error);
      }
    };

    if (user) {
      fetchUserGigs();
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="flex justify-end mb-4">
          <Link to="/createGig" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Gig
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {userGigs.map(gig => (
            <div key={gig.id} className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-semibold">{gig.title}</h2>
              <p className="text-gray-500">{gig.description}</p>
              <Link to={`/ProfileDashboard`} className="text-blue-500 hover:underline mt-2 block">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyGigs;

