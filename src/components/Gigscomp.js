import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '../Context/Context';
import { db } from '../Firebase/Firebase';
import { useGig } from '../Context/GigContext';

const Gigcomp = () => {
  const { user } = useUser();
  const [userGigs, setUserGigs] = useState([]);
  const { selectGig } = useGig(); // Use the useGig hook to select gig

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
      <div className="container mx-auto mt-8">
        
        <div className="grid grid-cols-3 gap-4">
          {userGigs.map(gig => (
            <div key={gig.id} className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-semibold">{gig.title}</h2>
              <Link to={`/ProfileDashboard`} onClick={() => selectGig(gig)} className="text-blue-500 hover:underline mt-2 block">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigcomp;

