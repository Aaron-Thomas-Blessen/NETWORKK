import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";
import Navbar from "../../components/nav";
import { ClipLoader } from "react-spinners";
import { FaStar } from "react-icons/fa";

const OtherUserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setUser(userData);

        // Fetch user's reviews
        const userReviews = await Promise.all(
          (userData.reviews || []).map(async (reviewId) => {
            const reviewRef = doc(db, "reviews", reviewId);
            const reviewSnapshot = await getDoc(reviewRef);
            return reviewSnapshot.exists() ? { id: reviewSnapshot.id, ...reviewSnapshot.data() } : null;
          })
        );
        setReviews(userReviews.filter(review => review !== null));
      }

      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"} />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={100} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-16">
        <p className="text-gray-600">User not found.</p>
      </div>
    );
  }

  return (
    <div className="UserProfile min-h-screen bg-gray-100">
      <Navbar />
      <div className="mt-16 px-4 md:px-8 container mx-auto p-8 bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center">
          <img src={user.profilePic} alt="Profile" className="w-24 h-24 rounded-full mb-4 object-cover" />
          <h1 className="text-2xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
          <p className="text-gray-600 mb-4">@{user.username}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-gray-800 font-semibold">{review.description}</p>
                <div className="flex items-center">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-gray-600">{review.rating}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;
