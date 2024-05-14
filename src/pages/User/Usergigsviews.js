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
    <div className="h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8 h-full flex justify-center items-center">
      <div className="container mx-auto p-8 h-full flex flex-col justify-center items-center">
        {/* Gig Details Section */}
        <div className="flex flex-col items-start mb-8"> 
          <h1>{selectedGig.title}</h1>
          <p>Category: {selectedGig.category}</p>
          <p>Description: {selectedGig.description}</p>
          <p>Base Price: Rs.{selectedGig.basePrice} /-</p>
          <p>Address: {selectedGig.address}</p>
          <p>Phone Number: {selectedGig.phoneNumber}</p>
          <p>Email: {selectedGig.email}</p>
        </div>
        
        {/* Gig PDF Section */}
        <div className="flex flex-col items-start"> 
          <h2>Gig PDF</h2>
          <a href={gigPdfUrl} target="_blank" rel="noreferrer" download>
            Download Gig PDF
          </a>
        </div>
        
        {/* Button to book now */}
        <button onClick={handleBookNow} className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Book Now
        </button>
      </div>
    </div>
  </div>
  );
  
};

export default UsergigsViews;

