import React, { useState, useEffect } from "react";
import { db, storage } from "../../Firebase/Firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs, addDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Button } from "@material-tailwind/react";
import { ClipLoader } from "react-spinners";
import Navbar from "../../components/nav";

const UserProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [reviewForms, setReviewForms] = useState({});
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserData(userData);
          setFormData(userData);
          setProfilePicture(userData.profilePicture || "default_profile_picture_url");
        }

        // Fetch completed bookings
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("userId", "==", currentUser.uid), where("bookingStatus", "==", "Completed"));
        const querySnapshot = await getDocs(q);
        const bookingsData = await Promise.all(querySnapshot.docs.map(async (bookingDoc) => {
          const booking = bookingDoc.data();
          const serviceDoc = await getDoc(doc(db, "services", booking.serviceId));
          if (serviceDoc.exists()) {
            booking.serviceName = serviceDoc.data().title;
          }
          // Fetch review details if reviewId exists
          if (booking.isReview && booking.reviewId) {
            const reviewDoc = await getDoc(doc(db, "reviews", booking.reviewId));
            if (reviewDoc.exists()) {
              booking.review = reviewDoc.data();
            }
          }
          return { id: bookingDoc.id, ...booking };
        }));

        setCompletedBookings(bookingsData);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, formData);
      setUserData(formData);
      setEditing(false);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setFormData(userData);
    setEditing(false);
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const currentUser = auth.currentUser;
      const oldProfilePicture = userData.profilePicture;

      const fileReference = storageRef(storage, `profilePicture/${currentUser.uid}/${file.name}`);
      setLoading(true);
      try {
        await uploadBytes(fileReference, file);
        const url = await getDownloadURL(fileReference);

        // Update Firestore with the new profile picture URL
        await updateDoc(doc(db, "users", currentUser.uid), { profilePicture: url });

        // Set the new profile picture URL in the state
        setProfilePicture(url);

        // Delete the old profile picture from storage if it exists and is not the default picture
        if (oldProfilePicture && oldProfilePicture !== "default_profile_picture_url") {
          const oldFileRef = storageRef(storage, oldProfilePicture);
          try {
            await deleteObject(oldFileRef);
            console.log("Old profile picture deleted successfully");
          } catch (error) {
            console.error("Error deleting old profile picture:", error);
          }
        }

        // Update userData state
        setUserData((prevUserData) => ({
          ...prevUserData,
          profilePicture: url,
        }));
        
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleReviewInputChange = (e, bookingId) => {
    const { name, value } = e.target;
    setReviewForms({ ...reviewForms, [bookingId]: { ...reviewForms[bookingId], [name]: value } });
  };

  const handleReviewSubmit = async (booking) => {
    const { description, rating } = reviewForms[booking.id] || {};
    if (description && rating) {
      try {
        const reviewRef = await addDoc(collection(db, "reviews"), {
          description,
          rating: Number(rating),
          userId: auth.currentUser.uid,
          serviceId: booking.serviceId,
          createdAt: new Date(),
        });

        // Update the booking document to indicate that a review has been submitted
        await updateDoc(doc(db, "bookings", booking.id), {
          isReview: true,
          reviewId: reviewRef.id,
        });

        // Add reviewId to the service document's reviews array
        await updateDoc(doc(db, "services", booking.serviceId), {
          reviews: arrayUnion(reviewRef.id),
        });

        console.log("Review submitted successfully");
        // Remove the review form for the booking
        setReviewForms((prevState) => {
          const updatedForms = { ...prevState };
          delete updatedForms[booking.id];
          return updatedForms;
        });

        // Update the completed bookings state to reflect the review submission
        setCompletedBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.id === booking.id ? { ...b, isReview: true, reviewId: reviewRef.id, review: { description, rating } } : b
          )
        );
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  if (loading) {
    return <ClipLoader color="#00BFFF" loading={loading} size={150} />;
  }

  return (
    <div>
      <Navbar currentPage="userProfilePage" />
      <div className="container mx-auto mt-8 flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
          <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
            <label htmlFor="profilePictureInput" className="cursor-pointer mb-4">
              <img src={profilePicture} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
              <div className="text-blue-500">Change Profile Picture</div>
            </label>
            <input
              id="profilePictureInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
            {editing ? (
              <div className="flex flex-col">
                <div className="flex flex-row mb-2">
                  <label htmlFor="firstNameInput" className="w-36">First Name:</label>
                  <input type="text" id="firstNameInput" value={formData.firstName || ''} name="firstName" onChange={handleInputChange} />
                </div>
                <div className="flex flex-row mb-2">
                  <label htmlFor="lastNameInput" className="w-36">Last Name:</label>
                  <input type="text" id="lastNameInput" value={formData.lastName || ''} name="lastName" onChange={handleInputChange} />
                </div>
                <div className="flex flex-row mb-2">
                  <label htmlFor="phoneNumberInput" className="w-36">Phone Number:</label>
                  <input type="text" id="phoneNumberInput" value={formData.phoneNumber || ''} name="phoneNumber" onChange={handleInputChange} />
                </div>
                <div className="flex flex-row mb-2">
                  <label htmlFor="addressInput" className="w-36">Address:</label>
                  <input type="text" id="addressInput" value={formData.address || ''} name="address" onChange={handleInputChange} />
                </div>
                <div className="flex flex-row space-x-4">
                  <Button color="blue" size="sm" onClick={handleSaveClick}>Save</Button>
                  <Button color="gray" size="sm" onClick={handleCancelClick}>Cancel</Button>
                </div>
              </div>
            ) : (
              <>
                <p>Username: {userData.username}</p>
                <p>Email: {userData.email}</p>
                <p>First Name: {userData.firstName}</p>
                <p>Last Name: {userData.lastName}</p>
                <p>Phone Number: {userData.phoneNumber}</p>
                <p>Address: {userData.address}</p>
                <Button color="blue" onClick={handleEditClick}>Edit</Button>
              </>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
          <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Completed Bookings</h2>
            {completedBookings.length > 0 ? (
              <ul>
                {completedBookings.map((booking) => (
                  <li key={booking.id} className="mb-4">
                    <p><strong>Booking ID:</strong> {booking.id}</p>
                    <p><strong>Service Name:</strong> {booking.serviceName}</p>
                    <p><strong>Base Payment:</strong> {booking.basePayment}</p>
                    <p><strong>Extra Payment:</strong> {booking.extraPayment}</p>
                    <p><strong>Date:</strong> {booking.date}</p>
                    {booking.isReview && booking.review ? (
                      <div>
                        <p><strong>Review:</strong> {booking.review.description}</p>
                        <p><strong>Rating:</strong> {booking.review.rating}</p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Add Review</h3>
                        <textarea
                          name="description"
                          value={reviewForms[booking.id]?.description || ""}
                          onChange={(e) => handleReviewInputChange(e, booking.id)}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-2 resize-none"
                          placeholder="Enter your review..."
                        ></textarea>
                        <input
                          type="number"
                          name="rating"
                          value={reviewForms[booking.id]?.rating || ""}
                          onChange={(e) => handleReviewInputChange(e, booking.id)}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-2"
                          placeholder="Enter rating (1-5)"
                        />
                        <Button color="blue" size="sm" onClick={() => handleReviewSubmit(booking)}>Submit Review</Button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No completed bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
