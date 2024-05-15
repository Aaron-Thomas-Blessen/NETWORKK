import React, { useEffect, useState } from "react";
import { useGig } from "../../Context/GigContext";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Navbar from "../../components/nav";
import Slider from "react-slick";
import { collection, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../Firebase/Firebase";

const UsergigsViews = () => {
  const { selectedGig } = useGig();
  const [gigPdfUrl, setGigPdfUrl] = useState("");
  const [reviews, setReviews] = useState([]);
  const [demoPicsUrls, setDemoPicsUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrlsAndReviews = async () => {
      if (!selectedGig) {
        console.log("Selected gig not set.");
        return;
      }

      console.log("Selected gig:", selectedGig);

      // Fetch gig PDF URL
      const gigPdfRef = ref(storage, `${selectedGig.gigPdf}`);
      const gigPdfUrl = await getDownloadURL(gigPdfRef);
      console.log("Gig PDF URL:", gigPdfUrl);
      setGigPdfUrl(gigPdfUrl);

      // Fetch demo pics URLs
      const demoPicsUrlsPromises = selectedGig.demoPics.map(async (pic) => {
        const picRef = ref(storage, pic);
        const picUrl = await getDownloadURL(picRef);
        return picUrl;
      });

      const fetchedDemoPicsUrls = await Promise.all(demoPicsUrlsPromises);
      setDemoPicsUrls(fetchedDemoPicsUrls);

      // Fetch reviews and usernames
      const fetchedReviews = await Promise.all(
        selectedGig.reviews.map(async (reviewId) => {
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
    };

    fetchUrlsAndReviews();
  }, [selectedGig]);

  const handleBookNow = () => {
    // Navigate to the booking page with service details
    navigate("/booking", { state: selectedGig });
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
      <div className="container mx-auto p-8 flex">
        {/* Left Side - 3/5th space */}
        <div className="md:w-3/5">
          <div className="w-full p-6">
            {/* Gig Details Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4">{selectedGig.title}</h1>
              <p className="text-gray-600 mb-2">Rating: {selectedGig.avgRat}</p>
              <p className="text-gray-600 mb-2">
                Number of Reviews: {selectedGig.count}
              </p>
              <p className="text-gray-600 mb-2">
                Category: {selectedGig.category}
              </p>
              <p className="text-gray-600 mb-2">
                Description: {selectedGig.description}
              </p>
            </div>
            {/* Display Carousel */}
            <Slider {...settings}>
              {demoPicsUrls.map((url, index) => (
                <div key={index} className="relative w-full h-80">
                  <img
                    src={url}
                    alt={`Demo ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </Slider>

            {/* Reviews Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="mb-4 p-4 bg-white rounded-lg shadow-md"
                  >
                    <p className="text-gray-800 font-semibold">
                      {review.description}
                    </p>
                    <p className="text-gray-600">Rating: {review.rating}</p>
                    <p className="text-gray-600">Username: {review.username}</p>
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
              <h2> Rs.{selectedGig.basePrice} /-</h2>
            </div>

            {/* Button to book now */}
            <button
              onClick={handleBookNow}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded"
            >
              Book Now
            </button>

            {/* Gig Contact Section */}
            <div className="bg-white rounded-lg shadow-md py-4">
              <div className="py-5 text-center">
                <h1 className="mb-8 font-bold">Contact Me</h1>
                <p className="text-gray-600 mb-4">
                  Address: {selectedGig.address}
                </p>
                <p className="text-gray-600 mb-4">
                  Locality: {selectedGig.locality}
                </p>
                <p className="text-gray-600 mb-4">
                  Phone Number: {selectedGig.phoneNumber}
                </p>
                <p className="text-gray-600">Email: {selectedGig.email}</p>
              </div>

              {/* Gig PDF Section */}
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold mb-4">
                  Police Clearance Certificate
                </h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsergigsViews;
