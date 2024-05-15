import React, { useState, useEffect } from "react";
import { useUser } from "../../Context/Context";
import { Button } from "@material-tailwind/react";
import { ClipLoader } from "react-spinners";
import Navbar from "../../components/nav";
import { db } from "../../Firebase/Firebase";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import Collapsible from '@edonec/collapsible';
import '@edonec/collapsible/build/index.css';
import '@edonec/collapsible/build/icons.css';
import { useSpring, animated } from 'react-spring';

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
          const acceptedBookingsQuery = query(
            bookingRef,
            where("serviceProviderId", "==", user.uid),
            where("bookingStatus", "==", "Accepted")
          );
          const rejectedBookingsQuery = query(
            bookingRef,
            where("serviceProviderId", "==", user.uid),
            where("bookingStatus", "==", "Rejected")
          );

          const fetchAndSetBookings = async () => {
            const [pendingBookingsSnapshot, acceptedBookingsSnapshot, rejectedBookingsSnapshot] = await Promise.all([
              getDocs(pendingBookingsQuery),
              getDocs(acceptedBookingsQuery),
              getDocs(rejectedBookingsQuery)
            ]);

            const pendingBookingsData = await Promise.all(pendingBookingsSnapshot.docs.map(async (doc) => {
              const bookingData = doc.data();
              const userData = await getUserData(bookingData.userId);
              return { id: doc.id, ...bookingData, userData };
            }));

            const acceptedBookingsData = await Promise.all(acceptedBookingsSnapshot.docs.map(async (doc) => {
              const bookingData = doc.data();
              const userData = await getUserData(bookingData.userId);
              return { id: doc.id, ...bookingData, userData };
            }));

            const rejectedBookingsData = await Promise.all(rejectedBookingsSnapshot.docs.map(async (doc) => {
              const bookingData = doc.data();
              const userData = await getUserData(bookingData.userId);
              return { id: doc.id, ...bookingData, userData };
            }));

            setPendingBookings(pendingBookingsData);
            setAcceptedBookings(acceptedBookingsData);
            setRejectedBookings(rejectedBookingsData);
            setLoading(false);
          };

          fetchAndSetBookings();

          const unsubscribePending = onSnapshot(pendingBookingsQuery, fetchAndSetBookings);
          const unsubscribeAccepted = onSnapshot(acceptedBookingsQuery, fetchAndSetBookings);
          const unsubscribeRejected = onSnapshot(rejectedBookingsQuery, fetchAndSetBookings);

          return () => {
            unsubscribePending();
            unsubscribeAccepted();
            unsubscribeRejected();
          };
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
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, { bookingStatus: "Accepted" });
      setPendingBookings(pendingBookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, { bookingStatus: "Rejected" });
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

  const bookingStyles = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" }
  });

  return (
    <div>
      <Navbar currentPage="sellerBookingsPage"/>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={100} color="#123abc" />
        </div>
      ) : (
      <div className="container mx-auto mt-8">
        <div className="gap-4">
          {/* Pending Bookings */}
          <Collapsible open header="Pending Bookings">
            <div>
              {pendingBookings.map((booking) => (
                <animated.div style={bookingStyles} key={booking.id} className="bg-white p-4 shadow-lg rounded-md mb-4">
                  <p><strong>User Name:</strong> {booking.userData && booking.userData.username}</p>
                  <p><strong>Phone Number:</strong> {booking.userData && booking.userData.phoneNumber}</p>
                  <p><strong>Address:</strong> {booking.address}</p>
                  <p><strong>Description:</strong> {booking.description}</p>
                  <p><strong>Date:</strong> {booking.date}</p>
                  <div className="flex gap-4">
                    <Button color="green" onClick={() => handleAccept(booking.id)}>Accept</Button>
                    <Button color="red" onClick={() => handleReject(booking.id)}>Reject</Button>
                  </div>
                </animated.div>
              ))}
            </div>
          </Collapsible>

          {/* Accepted Bookings */}
          <Collapsible open header="Accepted Bookings">
            <div>
              {acceptedBookings.map((booking) => (
                <animated.div style={bookingStyles} key={booking.id} className="bg-white p-4 shadow-lg rounded-md mb-4">
                  <p><strong>User Name:</strong> {booking.userData && booking.userData.username}</p>
                  <p><strong>Phone Number:</strong> {booking.userData && booking.userData.phoneNumber}</p>
                  <p><strong>Address:</strong> {booking.address}</p>
                  <p><strong>Description:</strong> {booking.description}</p>
                  <p><strong>Date:</strong> {booking.date}</p>
                </animated.div>
              ))}
            </div>
          </Collapsible>

          {/* Rejected Bookings */}
          <Collapsible open header="Rejected Bookings">
            <div>
              {rejectedBookings.map((booking) => (
                <animated.div style={bookingStyles} key={booking.id} className="bg-white p-4 shadow-lg rounded-md mb-4">
                  <p><strong>User Name:</strong> {booking.userData && booking.userData.username}</p>
                  <p><strong>Phone Number:</strong> {booking.userData && booking.userData.phoneNumber}</p>
                  <p><strong>Address:</strong> {booking.address}</p>
                  <p><strong>Description:</strong> {booking.description}</p>
                  <p><strong>Date:</strong> {booking.date}</p>
                </animated.div>
              ))}
            </div>
          </Collapsible>
        </div>
      </div>
      )}
    </div>
  );
};

export default SellerBookingsPage;
