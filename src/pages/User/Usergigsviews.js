import React, { useEffect, useState } from 'react';
import { useGig } from '../../Context/GigContext';
import Carousel from '../../components/carousel';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const UsergigsViews = () => {
  const { selectedGig } = useGig();
  const [demoPicsUrls, setDemoPicsUrls] = useState([]);
  const [gigPdfUrl, setGigPdfUrl] = useState('');

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

  if (!selectedGig) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render selected gig details here */}
      <h1>{selectedGig.title}</h1>
      <p>Category: {selectedGig.category}</p>
      <p>Description: {selectedGig.description}</p>
      <p>Base Price: Rs.{selectedGig.basePrice} /-</p>
      <p>Address: {selectedGig.address}</p>
      <p>Phone Number: {selectedGig.phoneNumber}</p>
      <p>Email: {selectedGig.email}</p>
      <div>
        <h2>Demo Pics</h2>
        <Carousel images={demoPicsUrls} />
      </div>
      <div>
        <h2>Gig PDF</h2>
        <a href={gigPdfUrl} target="_blank" rel="noreferrer" download>
          Download Gig PDF
        </a>
      </div>
    </div>
  );
};

export default UsergigsViews;

