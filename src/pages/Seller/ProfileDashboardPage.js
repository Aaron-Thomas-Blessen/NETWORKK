import React, { useEffect, useState } from "react";
import { useGig } from "../../Context/GigContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import Navbar from "../../components/nav";
import Slider from "react-slick";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // Importing the calendar CSS

const ProfileDashboard = () => {
  const { selectedGig, selectGig } = useGig();
  const [demoPicsUrls, setDemoPicsUrls] = useState([]);
  const [gigPdfUrl, setGigPdfUrl] = useState("");
  const [reviews, setReviews] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUrlsAndReviews = async () => {
      if (!selectedGig) {
        return;
      }

      const storage = getStorage();
      
      // Fetch demo pics URLs
      const demoPicsUrlsPromises = selectedGig.demoPics.map(async (pic) => {
        const picRef = ref(storage, pic);
        const picUrl = await getDownloadURL(picRef);
        return picUrl;
      });

      const fetchedDemoPicsUrls = await Promise.all(demoPicsUrlsPromises);
      setDemoPicsUrls(fetchedDemoPicsUrls);

      // Fetch gig PDF URL
      const gigPdfRef = ref(storage, `${selectedGig.gigPdf}`);
      const gigPdfUrl = await getDownloadURL(gigPdfRef);
      setGigPdfUrl(gigPdfUrl);

      // Fetch reviews
      const reviewsPromises = selectedGig.reviews.map(async (reviewId) => {
        const reviewRef = doc(db, "reviews", reviewId);
        const reviewDoc = await getDoc(reviewRef);
        const reviewData = reviewDoc.data();

        // Fetch the username
        const userRef = doc(db, "users", reviewData.userId);
        const userDoc = await getDoc(userRef);
        const username = userDoc.exists() ? userDoc.data().username : "Unknown User";

        return { id: reviewDoc.id, ...reviewData, username };
      });

      const fetchedReviews = await Promise.all(reviewsPromises);
      setReviews(fetchedReviews);

      // Set holidays and isOpen state
      setHolidays(selectedGig.holidays || []);
      setIsOpen(selectedGig.isOpen || false);
    };

    fetchUrlsAndReviews();
  }, [selectedGig]);

  const handleDateClick = async (date) => {
    const dateString = date.toISOString().split('T')[0];
    const serviceRef = doc(db, "services", selectedGig.id);
    let newHolidays;

    if (holidays.includes(dateString)) {
      // Remove the date from holidays
      newHolidays = holidays.filter(h => h !== dateString);
    } else {
      // Add the date to holidays
      newHolidays = [...holidays, dateString];
    }
    
    setHolidays(newHolidays);
    await updateDoc(serviceRef, { holidays: newHolidays });

    // Update the selectedGig context
    const updatedGig = { ...selectedGig, holidays: newHolidays };
    selectGig(updatedGig);
  };

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];
    return holidays.includes(dateString) ? 'bg-red-500' : 'bg-green-500';
  };

  const toggleOpenStatus = async () => {
    const serviceRef = doc(db, "services", selectedGig.id);
    await updateDoc(serviceRef, { isOpen: !isOpen });

    // Update the selectedGig context
    const updatedGig = { ...selectedGig, isOpen: !isOpen };
    selectGig(updatedGig);
    setIsOpen(!isOpen);
  };

  if (!selectedGig) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - 3/5th space */}
          <div className="md:w-3/5">
            <div className="w-full p-6">
              {/* Gig Details Section */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">{selectedGig.title}</h1>
                <p className="text-gray-600 mb-2">Validation Status: {selectedGig.status}</p>
                <p className="text-gray-600 mb-2">Category: {selectedGig.category}</p>
                <p className="text-gray-600 mb-2">Description: {selectedGig.description}</p>
              </div>
              {/* Display Carousel */}
              <Slider {...settings}>
                {demoPicsUrls.map((url, index) => (
                  <div key={index}>
                    <img src={url} alt={`Demo ${index + 1}`} className="w-full mb-4 rounded-lg" />
                  </div>
                ))}
              </Slider>
              {/* Reviews Section */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                      <p className="text-gray-800 font-semibold">{review.description}</p>
                      <p className="text-gray-600">Rating: {review.rating}</p>
                      <p className="text-gray-600">Username: {review.username}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No reviews available.</p>
                )}
                </div>
                {/* Calendar Section */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Holidays</h2>
                  <Calendar
                    onClickDay={handleDateClick}
                    tileClassName={tileClassName}
                  />
                </div>
              </div>
            </div>
  
            {/* Right Side - 2/5th space */}
            <div className="w-full md:w-2/5">
              <div className="max-w-md w-full p-6">
                {/* Gig Price Section */}
                <div className="text-xl bg-white rounded-lg shadow-md font-semibold mb-6 text-center py-8">
                  <h1 className="mb-8">Base Price:</h1>
                  <h2> Rs.{selectedGig.basePrice} /-</h2>
                </div>
  
                {/* Gig Contact Section */}
                <div className="bg-white rounded-lg shadow-md mb-8 py-4">
                  <div className="py-5 text-center">
                    <h1 className="mb-8 font-bold">Contact Me</h1>
                    <p className="text-gray-600 mb-4">Address: {selectedGig.address}</p>
                    <p className="text-gray-600 mb-4">Phone Number: {selectedGig.phoneNumber}</p>
                    <p className="text-gray-600">Email: {selectedGig.email}</p>
                  </div>
                </div>
                {/* Gig PDF Section */}
                <div className="bg-white rounded-lg shadow-md py-4">
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-semibold mb-4">Police Clearance Certificate</h2>
                    <a
                      href={gigPdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="text-blue-500 hover:text-blue-700 mb-4"
                    >
                      Download PCC PDF
                    </a>
                  </div>
                  <div></div>
                </div>
                {/* Toggle Open/Close Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={toggleOpenStatus}
                    className={`w-full py-2 px-4 rounded ${isOpen ? 'bg-red-500' : 'bg-green-500'} text-white font-bold`}
                  >
                    {isOpen ? 'Close' : 'Open'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileDashboard;
  