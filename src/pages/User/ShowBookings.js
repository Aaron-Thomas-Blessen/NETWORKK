import React, { useEffect, useState } from 'react';
import { useUser } from '../../Context/Context';
import { db } from '../../Firebase/Firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Collapsible from '@edonec/collapsible';
import '@edonec/collapsible/build/index.css';
import '@edonec/collapsible/build/icons.css';
import Navbar from '../../components/nav';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useSpring, animated } from 'react-spring';

const BookingsPage = () => {
  const { user } = useUser();
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; // Ensure user is logged in

    const bookingsRef = collection(db, 'bookings');
    const q = query(bookingsRef, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortByDate = (bookings) => {
        return bookings.sort((a, b) => new Date(a.date) - new Date(b.date));
      };

      const pending = sortByDate(bookingsData.filter((booking) => booking.bookingStatus === 'Pending'));
      const accepted = sortByDate(bookingsData.filter((booking) => booking.bookingStatus === 'Accepted'));
      const rejected = sortByDate(bookingsData.filter((booking) => booking.bookingStatus === 'Rejected'));

      setPendingBookings(pending);
      setAcceptedBookings(accepted);
      setRejectedBookings(rejected);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handlePayment = (booking) => {
    navigate('/payments', {
      state: {
        userId: user.uid,
        serviceProviderId: booking.serviceProviderId,
        serviceId: booking.serviceId,
        bookingId: booking.id,
      }
    });
  };

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <div className="BookingsPage">
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={150} color="#123abc" />
        </div>
      ) : (
        <animated.div style={fade}>
          <Collapsible open header="Pending Bookings">
            <div className="section bg-white p-4 shadow-md rounded-md mb-4">
              {pendingBookings.length > 0 ? (
                <ul>
                  {pendingBookings.map((booking) => (
                    <li key={booking.id} className="mb-2">
                      <p>Address: {booking.address}</p>
                      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                      <p>Description: {booking.description}</p>
                      <p>Base Payment: {booking.basePayment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No pending bookings found.</p>
              )}
            </div>
          </Collapsible>
          <Collapsible open header="Accepted Bookings">
            <div className="section bg-white p-4 shadow-md rounded-md mb-4">
              {acceptedBookings.length > 0 ? (
                <ul>
                  {acceptedBookings.map((booking) => (
                    <li key={booking.id} className="mb-2">
                      <p>Address: {booking.address}</p>
                      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                      <p>Description: {booking.description}</p>
                      <p className="mb-2">Base Payment: {booking.basePayment}</p>
                      <button 
                        className="bg-blue-600 text-white py-2 px-4 rounded" 
                        onClick={() => handlePayment(booking)}
                      >
                        Pay Now
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No accepted bookings found.</p>
              )}
            </div>
          </Collapsible>
          <Collapsible open header="Rejected Bookings">
            <div className="section bg-white p-4 shadow-md rounded-md mb-4">
              {rejectedBookings.length > 0 ? (
                <ul>
                  {rejectedBookings.map((booking) => (
                    <li key={booking.id} className="mb-2">
                      <p>Address: {booking.address}</p>
                      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                      <p>Description: {booking.description}</p>
                      <p>Base Payment: {booking.basePayment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No rejected bookings found.</p>
              )}
            </div>
          </Collapsible>
        </animated.div>
      )}
    </div>
  );
};

export default BookingsPage;
