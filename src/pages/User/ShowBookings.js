import React, { useEffect, useState } from 'react';
import { useUser } from '../../Context/Context';
import { db } from '../../Firebase/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Collapsible from '@edonec/collapsible';
import '@edonec/collapsible/build/index.css';
// In case you do not want to customize the icons just import our's (more like fontawsome's) !
import '@edonec/collapsible/build/icons.css';
import Navbar from '../../components/nav';

const BookingsPage = () => {
  const { user } = useUser();
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return; // Ensure user is logged in
  
      try {
        // Query Firestore for all user's bookings
        const bookingsRef = collection(db, 'bookings');
        const q = query(
          bookingsRef,
          where('userId', '==', user.uid) // Filter by user ID
        );
        const querySnapshot = await getDocs(q);
  
        // Log raw data
        const bookingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Raw Bookings Data:', bookingsData);
  
        // Separate bookings based on status
        const pending = bookingsData.filter((booking) => booking.bookingStatus === 'Pending');
        const accepted = bookingsData.filter((booking) => booking.bookingStatus === 'Accepted');
        const rejected = bookingsData.filter((booking) => booking.bookingStatus === 'Rejected');
  
        console.log('Pending Bookings:', pending);
        console.log('Accepted Bookings:', accepted);
        console.log('Rejected Bookings:', rejected);
  
        // Update state with the filtered bookings
        setPendingBookings(pending);
        setAcceptedBookings(accepted);
        setRejectedBookings(rejected);
      } catch (error) {
        console.error('Error fetching bookings:', error); // Log any errors
      }
    };
  
    fetchBookings();
  }, [user]);
  

  console.log('Pending Bookings State:', pendingBookings);
  console.log('Accepted Bookings State:', acceptedBookings);
  console.log('Rejected Bookings State:', rejectedBookings);

  return (
    <div className="BookingsPage">
        <Navbar />
        <Collapsible open header="Pending Bookings">
            <div className="section">
                {pendingBookings.length > 0 ? (
                <ul>
                {pendingBookings.map((booking) => (
                    <li key={booking.id}>
                    <p>Address: {booking.address}</p>
                    <p>Date: {booking.date}</p>
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
            <div className='section'>
                {acceptedBookings.length > 0 ? (
                <ul>
                    {acceptedBookings.map((booking) => (
                    <li key={booking.id}>
                        <p>Address: {booking.address}</p>
                        <p>Date: {booking.date}</p>
                        <p>Description: {booking.description}</p>
                        <p>Base Payment: {booking.basePayment}</p>
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No accepted bookings found.</p>
                )}
            </div>
        </Collapsible>
        <Collapsible open header="Rejected Bookings">
            <div className='section'>
                {rejectedBookings.length > 0 ? (
                <ul>
                    {rejectedBookings.map((booking) => (
                    <li key={booking.id}>
                        <p>Address: {booking.address}</p>
                        <p>Date: {booking.date}</p>
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
    </div>
  );
};

export default BookingsPage;
