import React, { useEffect, useState } from "react";
import { useGig } from "../../Context/GigContext";
import { useNavigate, useLocation } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Navbar from "../../components/nav";
import Slider from "react-slick";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../Firebase/Firebase";
import { ClipLoader } from "react-spinners";
import { useSpring, animated } from "react-spring";
import { FaStar, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFilePdf } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const UsergigsViews = () => {
  const { selectedGig } = useGig();
  const [gigPdfUrl, setGigPdfUrl] = useState("");
  const [reviews, setReviews] = useState([]);
  const [demoPicsUrls, setDemoPicsUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const location = useLocation();
  const [date, setDate] = useState(location.state?.date || '');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrlsAndReviews = async () => {
      if (!selectedGig) {
        console.log("Selected gig not set.");
        return;
      }

      console.log("Selected gig:", selectedGig);

      setLoading(true);

      // Fetch gig PDF URL
      const gigPdfRef = ref(storage, `${selectedGig.gigPdf}`);
      const gigPdfUrl = await getDownloadURL(gigPdfRef);
      console.log("Gig PDF URL:", gigPdfUrl);
      setGigPdfUrl(gigPdfUrl);

      // Fetch demo pics URLs
      const demoPicsUrlsPromises = (selectedGig.demoPics || []).map(async (pic) => {
        const picRef = ref(storage, pic);
        const picUrl = await getDownloadURL(picRef);
        return picUrl;
      });

      const fetchedDemoPicsUrls = await Promise.all(demoPicsUrlsPromises);
      setDemoPicsUrls(fetchedDemoPicsUrls);

      // Fetch reviews and usernames
      const fetchedReviews = await Promise.all(
        (selectedGig.reviews || []).map(async (reviewId) => {
          const reviewRef = doc(db, "reviews", reviewId);
          const reviewSnapshot = await getDoc(reviewRef);
          const reviewData = reviewSnapshot.data();

          // Fetch username
          const userRef = doc(db, "users", reviewData.userId);
          const userSnapshot = await getDoc(userRef);
          const username = userSnapshot.exists()
            ? userSnapshot.data().username
            : "Unknown User";

          return { id: reviewSnapshot.id, ...reviewData, username };
        })
      );
      setReviews(fetchedReviews);

      setLoading(false);
    };

    fetchUrlsAndReviews();
  }, [selectedGig]);

  const handleBookNow = () => {
    navigate("/booking", { state: { selectedGig, date } });
  };

  const handleUserProfileClick = (userId) => {
    navigate(`/userprofilepage/${userId}`);
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setShowReviewOverlay(true);
  };

  const handleCloseReviewOverlay = () => {
    setShowReviewOverlay(false);
    setSelectedReview(null);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"} />
      );
    }
    return stars;
  };

  const animatedProps = useSpring({ opacity: loading ? 0 : 1, from: { opacity: 0 } });

  if (loading || !selectedGig) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={100} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <animated.div style={animatedProps} className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mt-16 px-4 md:px-8 container mx-auto p-8 flex flex-col md:flex-row gap-8">
        {/* Left Side - 3/5th space */}
        <div className="md:w-3/5">
          <div className="w-full p-6">
            {/* Gig Details Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4">{selectedGig.title}</h1>
              <div className="flex items-center mb-2">
                {renderStars(selectedGig.avgRat ? selectedGig.avgRat : 0)}
                <span className="ml-2 text-gray-600">{selectedGig.avgRat ? selectedGig.avgRat : '-'}</span>
              </div>
              <p className="text-gray-600 mb-2">Number of Reviews: {selectedGig.count ? selectedGig.count : '-'}</p>
              <p className="text-gray-600 mb-2">Category: {selectedGig.category}</p>
              <p className="text-gray-600 mb-2">Description: {selectedGig.description}</p>
            </div>
            {/* Display Carousel */}
            <Slider {...settings}>
              {demoPicsUrls.map((url, index) => (
                <div key={index} className="relative w-full h-80">
                  <img
                    src={url}
                    alt={`Demo ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </Slider>

            {/* Reviews Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="mb-4 p-4 bg-white rounded-lg shadow-md cursor-pointer" onClick={() => handleReviewClick(review)}>
                    <p className="text-gray-800 font-semibold">{review.description}</p>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-gray-600">{review.rating}</span>
                    </div>
                    <p className="text-gray-600 cursor-pointer" onClick={(e) => {e.stopPropagation(); handleUserProfileClick(review.userId)}}>
                      Username: {review.username}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No reviews available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - 2/5th space */}
        <div className="w-full md:w-2/5">
          <div className="max-w-md w-full p-6">
            {/* Gig Price Section */}
            <div className="text-xl bg-white rounded-lg shadow-md font-semibold mb-6 text-center py-8">
              <h1 className="mb-8">Base Price:</h1>
              <h2>Rs. {selectedGig.basePrice} /-</h2>
            </div>

            {/* Button to book now */}
            <button
              onClick={handleBookNow}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Book Now
            </button>

            {/* Gig Contact Section */}
            <div className="bg-white rounded-lg shadow-md py-4">
              <div className="py-5 text-center">
                <h1 className="mb-8 font-bold">Contact Me</h1>
                <p className="text-gray-600 mb-4 flex items-center justify-center"><FaMapMarkerAlt className="mr-2" /> Address: {selectedGig.address}</p>
                <p className="text-gray-600 mb-4 flex items-center justify-center"><FaPhone className="mr-2" /> Phone Number: {selectedGig.phoneNumber}</p>
                <p className="text-gray-600 flex items-center justify-center"><FaEnvelope className="mr-2" /> Email: {selectedGig.email}</p>
              </div>

              {/* Gig PDF Section */}
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center justify-center"><FaFilePdf className="mr-2" />Police Clearance Certificate</h2>
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
            </div>

            {/* About Me Section */}
            <div className="bg-white rounded-lg shadow-md py-4 mt-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                <img src={selectedGig.profilePic} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <p className="text-gray-600 mb-2">{selectedGig.firstName} {selectedGig.lastName}</p>
                <p className="text-blue-500 cursor-pointer" onClick={() => handleUserProfileClick(selectedGig.userId)}>
                  @{selectedGig.username}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Overlay */}
      {showReviewOverlay && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-11/12 max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleCloseReviewOverlay}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Review</h2>
            <p className="text-gray-800 font-semibold">{selectedReview.description}</p>
            <div className="flex items-center">
              {renderStars(selectedReview.rating)}
              <span className="ml-2 text-gray-600">{selectedReview.rating}</span>
            </div>
            <p className="text-gray-600 cursor-pointer" onClick={() => handleUserProfileClick(selectedReview.userId)}>
              Username: {selectedReview.username}
            </p>
          </div>
        </div>
      )}
    </animated.div>
  );
};

export default UsergigsViews;
