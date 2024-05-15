import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useSpring, animated } from 'react-spring';
import { db } from '../../Firebase/Firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Navbarsign from '../../components/navsign';

const AdminBookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'bookings'), (snapshot) => {
      const bookingsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching data: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  const hoverEffect = {
    initial: {
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      transform: 'scale(1)',
    },
    hover: {
      boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.2)',
      transform: 'scale(1.05)',
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} />
      </div>
    );
  }

  return (
    <div>
        <Navbarsign />
    <animated.div style={fadeIn} className="p-5">
      <h2 className="text-2xl font-bold mb-5">Booking Details</h2>
      {bookings.map((booking) => (
        <animated.div
          key={booking.id}
          className="p-5 mb-5 bg-white rounded-lg shadow-md hover:shadow-lg transform transition duration-300"
          style={hoverEffect.initial}
          onMouseEnter={(e) => (e.currentTarget.style = { ...hoverEffect.hover })}
          onMouseLeave={(e) => (e.currentTarget.style = { ...hoverEffect.initial })}
        >
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Address:</strong> {booking.address}</div>
            <div><strong>Base Payment:</strong> {booking.basePayment}</div>
            <div><strong>Booking Status:</strong> {booking.bookingStatus}</div>
            <div><strong>Date:</strong> {booking.date}</div>
            <div><strong>Description:</strong> {booking.description}</div>
            <div><strong>Extra Payment:</strong> {booking.extraPayment}</div>
            <div><strong>Is Review:</strong> {booking.isReview ? 'Yes' : 'No'}</div>
            <div><strong>Payment Status:</strong> {booking.paymentStatus}</div>
            <div><strong>Review ID:</strong> {booking.reviewId}</div>
            <div><strong>Service ID:</strong> {booking.serviceId}</div>
            <div><strong>Service Provider ID:</strong> {booking.serviceProviderId}</div>
            <div><strong>User ID:</strong> {booking.userId}</div>
          </div>
        </animated.div>
      ))}
    </animated.div>
    </div>
  );
};

export default AdminBookings;
