import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '../Context/Context';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';

const Searches = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state;
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      const db = getFirestore();
      const q = query(collection(db, 'services'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const gigsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGigs(gigsData);
      setLoading(false);
    };

    fetchGigs();
  }, [category]);

  const handleGigClick = (gig) => {
    if (!user) {
      toast.error('You need to sign in to view further details');
    } else {
      navigate('/usergigsviews', { state: { gig } });
    }
  };

  return (
    <div className="Searches">
      <div className="flex flex-col items-center justify-center mt-8 px-4 md:px-8">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl text-center mb-6 font-semibold text-gray-700">Search Results for "{category}"</h1>
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
          ) : gigs.length > 0 ? (
            <ul className="space-y-4">
              {gigs.map(gig => (
                <li
                  key={gig.id}
                  className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-100 mb-8 transition"
                  onClick={() => handleGigClick(gig)}
                >
                  <h2 className="text-xl font-bold text-gray-800">{gig.title}</h2>
                  <p className="text-gray-600"><strong>Category:</strong> {gig.category}</p>
                  <p className="text-gray-600"><strong>Base Price:</strong> Rs {gig.basePrice}</p>
                  <p className="text-gray-600"><strong>Description:</strong> {gig.description}</p>
                  <p className="text-gray-600"><strong>Email:</strong> {gig.email}</p>
                  <p className="text-gray-600"><strong>Phone Number:</strong> {gig.phoneNumber}</p>
                  <p className="text-gray-600"><strong>Address:</strong> {gig.address}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">No services found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searches;
