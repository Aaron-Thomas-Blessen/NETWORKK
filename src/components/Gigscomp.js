import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '../Context/Context';
import { db } from '../Firebase/Firebase';
import { useGig } from '../Context/GigContext';
import { useNavigate } from 'react-router-dom';

const Gigcomp = () => {
  const { user } = useUser();
  const [userGigs, setUserGigs] = useState([]);
  const { selectGig } = useGig();
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Accepted':
        return 'text-green-700';
      case 'Rejected':
        return 'text-red-700';
      case 'Pending':
        return 'text-yellow-700';
      default:
        return 'text-gray-700';
    }
  };

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
            <div key={gig.id} onClick={() => {selectGig(gig); navigate(`/Profiledashboard`);}} className="p-4 border border-gray-300 rounded-lg mb-4 hover:shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer">
              <h2 className="text-xl font-semibold" >{gig.title}</h2>
              <p>
                <span className="text-black">Gig Status: </span>
                <span className={getStatusStyle(gig.status)}>{gig.status}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigcomp;

