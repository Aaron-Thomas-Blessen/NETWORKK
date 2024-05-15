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
            <div key={gig.id} className="p-4 border border-gray-300 rounded-lg mb-4 hover:shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer">
              <h2 className="text-xl font-semibold" onClick={() => selectGig(gig)}>{gig.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigcomp;

