import React, { useState, useEffect } from "react";
import { useUser } from "../../Context/Context";
import { Button } from "@material-tailwind/react";
import { ClipLoader } from "react-spinners";
import Navbar from "../../components/nav";
import { db } from "../../Firebase/Firebase";
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

const SellerBookingsPage = () => {
  const { user } = useUser();
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        try {
          const bookingRef = collection(db, "bookings");
          const pendingBookingsQuery = query(
            bookingRef,
            where("serviceProviderId", "==", user.uid),
            where("bookingStatus", "==", "Pending")
          );
          const pendingBookingsSnapshot = await getDocs(pendingBookingsQuery);
          const pendingBookingsData = await Promise.all(pendingBookingsSnapshot.docs.map(async (doc) => {
            const bookingData = doc.data();
            const userData = await getUserData(bookingData.userId);
            return { id: doc.id, ...bookingData, userData }; 
          }));
          setPendingBookings(pendingBookingsData);
          console.log("Pending Bookings:", pendingBookings);


          const acceptedBookingsQuery = query(
            bookingRef,
            where("serviceProviderId", "==", user.uid),
            where("bookingStatus", "==", "Accepted")
          );
          const acceptedBookingsSnapshot = await getDocs(acceptedBookingsQuery);
          const acceptedBookingsData = await Promise.all(acceptedBookingsSnapshot.docs.map(async (doc) => {
            const bookingData = doc.data();
            const userData = await getUserData(bookingData.userId);
            return { id: doc.id, ...bookingData, userData };
          }));
          setAcceptedBookings(acceptedBookingsData);

          const rejectedBookingsQuery = query(
            bookingRef,
            where("serviceProviderId", "==", user.uid),
            where("bookingStatus", "==", "Rejected")
          );
          const rejectedBookingsSnapshot = await getDocs(rejectedBookingsQuery);
          const rejectedBookingsData = await Promise.all(rejectedBookingsSnapshot.docs.map(async (doc) => {
            const bookingData = doc.data();
            const userData = await getUserData(bookingData.userId);
            return { ...bookingData, userData };
          }));
          setRejectedBookings(rejectedBookingsData);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          setLoading(false);
        }
      };

      fetchBookings();
    }
  }, [user]);

  const handleAccept = async (bookingId) => {
    try {
      console.log("Booking ID:", bookingId); // Log the bookingId to check if it's undefined
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, { bookingStatus: "Accepted" });
      // Update local state to reflect the change
      setPendingBookings(pendingBookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };
  

  const handleReject = async (bookingId) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, { bookingStatus: "Rejected" });
      // Update local state to reflect the change
      setPendingBookings(pendingBookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  const getUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      return userDoc.data();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  if (loading) {
    return <ClipLoader color="#00BFFF" loading={loading} size={150} />;
  }

  return (
    <div>
      <Navbar currentPage="sellerBookingsPage"/>
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-3 gap-4">
          {/* Pending Bookings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Pending Bookings</h2>
            {pendingBookings.map((booking) => (
            <div key={booking.id} className="bg-white p-4 shadow-md rounded-md mb-4">
                <p><strong>User Name:</strong> {booking.userData && booking.userData.username}</p>
                <p><strong>Phone Number:</strong> {booking.userData && booking.userData.phoneNumber}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Description:</strong> {booking.description}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <Button color="green" onClick={() => handleAccept(booking.id)}>Accept</Button>
                <Button color="red" onClick={() => handleReject(booking.id)}>Reject</Button>
            </div>
            ))}
          </div>
          
          {/* Accepted Bookings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Accepted Bookings</h2>
            {acceptedBookings.map((booking) => (
              <div key={booking.id} className="bg-white p-4 shadow-md rounded-md mb-4">
                <p><strong>User Name:</strong> {booking.userData && booking.userData.username}</p>
                <p><strong>Phone Number:</strong> {booking.userData && booking.userData.phoneNumber}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Description:</strong> {booking.description}</p>
                <p><strong>Date:</strong> {booking.date}</p>
              </div>
            ))}
          </div>
          
          {/* Rejected Bookings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Rejected Bookings</h2>
            {rejectedBookings.map((booking) => (
              <div key={booking.id} className="bg-white p-4 shadow-md rounded-md mb-4">
                <p><strong>User Name:</strong> {booking.userData && booking.userData.username}</p>
                <p><strong>Phone Number:</strong> {booking.userData && booking.userData.phoneNumber}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Description:</strong> {booking.description}</p>
                <p><strong>Date:</strong> {booking.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerBookingsPage;
