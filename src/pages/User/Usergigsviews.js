import React, { useEffect, useState } from 'react';
import { useGig } from '../../Context/GigContext';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../components/carousel';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Navbar from '../../components/nav';

const UsergigsViews = () => {
  const { selectedGig } = useGig();
  const [demoPicsUrls, setDemoPicsUrls] = useState([]);
  const [gigPdfUrl, setGigPdfUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      const storage = getStorage();

      if (!selectedGig) {
        console.log('Selected gig not set.');
        return;
      }

      console.log('Selected gig:', selectedGig);

      // Fetch demo pics URLs
      const demoPicsUrls = selectedGig.demoPics;
      console.log('Demo pics URLs:', demoPicsUrls);
      setDemoPicsUrls(demoPicsUrls);

      // Fetch gig PDF URL
      const gigPdfRef = ref(storage, `${selectedGig.gigPdf}`);
      const gigPdfUrl = await getDownloadURL(gigPdfRef);
      console.log('Gig PDF URL:', gigPdfUrl);
      setGigPdfUrl(gigPdfUrl);
    };

    fetchUrls();
  }, [selectedGig]);

  const handleBookNow = () => {
    // Navigate to the booking page with service details
    navigate('/booking', { state: selectedGig });
  };

  if (!selectedGig) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8 flex flex-col items-center justify-center h-full">
        {/* Gig Details Section */}
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">{selectedGig.title}</h1>
          <p className="text-gray-600 mb-2">Category: {selectedGig.category}</p>
          <p className="text-gray-600 mb-2">Description: {selectedGig.description}</p>
          <p className="text-gray-600 mb-2">Base Price: Rs.{selectedGig.basePrice} /-</p>
          <p className="text-gray-600 mb-2">Address: {selectedGig.address}</p>
          <p className="text-gray-600 mb-2">Phone Number: {selectedGig.phoneNumber}</p>
          <p className="text-gray-600 mb-4">Email: {selectedGig.email}</p>
          
          {/* Gig PDF Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gig PDF</h2>
            <a href={gigPdfUrl} target="_blank" rel="noreferrer" download className="text-blue-500 hover:underline">Download Gig PDF</a>
          </div>
          
          {/* Button to book now */}
          <button onClick={handleBookNow} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Book Now
          </button>
        </div>
        
        {/* Display Carousel of Demo Pics */}
        {/* {demoPicsUrls.length > 0 && (
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Demo Pics</h2>
            <Carousel images={demoPicsUrls} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default UsergigsViews;
