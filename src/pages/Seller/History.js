// History.js
import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase/Firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import Collapsible from '@edonec/collapsible';
import { useUser } from '../../Context/Context';
import Navbar from '../../components/nav';

const History = () => {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [serviceTitles, setServiceTitles] = useState({});
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchBookings = async (userId) => {
      try {
        console.log('Fetching bookings for userId:', userId); // Debug log
        const q = query(
          collection(db, 'bookings'),
          where('serviceProviderId', '==', userId),
          where('bookingStatus', '==', 'Completed')
        );

        const querySnapshot = await getDocs(q);
        const bookingsData = [];
        querySnapshot.forEach(doc => {
          console.log('Fetched booking doc:', doc.data()); // Debug log
          bookingsData.push(doc.data());
        });
        setBookings(bookingsData);
        console.log('Bookings Data:', bookingsData); // Debug log
        return bookingsData;
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const fetchServiceTitles = async (serviceIds) => {
      try {
        const titles = {};
        for (const id of serviceIds) {
          const serviceDoc = await getDoc(doc(db, 'services', id));
          if (serviceDoc.exists()) {
            titles[id] = serviceDoc.data().title;
          } else {
            titles[id] = `Service ID: ${id}`; // Fallback to ID if title is not found
          }
        }
        console.log('Service Titles:', titles); // Debug log
        setServiceTitles(titles);
      } catch (error) {
        console.error('Error fetching service titles:', error);
      }
    };

    const fetchUserDetails = async (userIds) => {
      try {
        const details = {};
        for (const id of userIds) {
          const userDoc = await getDoc(doc(db, 'users', id));
          if (userDoc.exists()) {
            details[id] = userDoc.data();
          } else {
            details[id] = { userName: 'Unknown', phoneNumber: 'Unknown' }; // Fallback to unknown if user details are not found
          }
        }
        console.log('User Details:', details); // Debug log
        setUserDetails(details);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const initializeData = async () => {
      if (user) {
        const bookingsData = await fetchBookings(user.uid);
        if (bookingsData.length > 0) {
          const serviceIds = [...new Set(bookingsData.map(booking => booking.serviceId))];
          const userIds = [...new Set(bookingsData.map(booking => booking.userId))];
          await fetchServiceTitles(serviceIds);
          await fetchUserDetails(userIds);
          console.log(serviceTitles[serviceIds]);
        } else {
          console.log('No bookings found for user:', user.uid); // Debug log
        }
      }
    };

    initializeData();
  }, [user]);

  const groupedBookings = bookings.reduce((groups, booking) => {
    const serviceId = booking.serviceId;
    if (!groups[serviceId]) {
      groups[serviceId] = [];
    }
    groups[serviceId].push(booking);
    return groups;
  }, {});

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="w-full px-4 pt-16">
        {Object.keys(groupedBookings).map(serviceId => (
          <div key={serviceId} className="p-2 bg-white rounded-2xl mb-4">
            <Collapsible open header={serviceTitles[serviceId]}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pt-4 pb-2 text-sm text-gray-500">
                {groupedBookings[serviceId].map(booking => (
                  <div key={booking.reviewId} className="bg-white p-4 shadow-md rounded-md mb-4">
                    <div>
                      <p><strong>Address:</strong> {booking.address}</p>
                      <p><strong>Date:</strong> {booking.date}</p>
                      <p><strong>Base Payment:</strong> ${booking.basePayment}</p>
                      <p><strong>Extra Payment:</strong> ${booking.extraPayment}</p>
                      <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
                      <p><strong>Service Provider ID:</strong> {booking.serviceProviderId}</p>
                    </div>
                    {booking.isReview ? (
                      <div>
                        <p><strong>Review:</strong> {booking.description}</p>
                        <p><strong>Review ID:</strong> {booking.reviewId}</p>
                      </div>
                    ) : (
                      <p>No review available</p>
                    )}
                    <div>
                      <p><strong>User Name:</strong> {userDetails[booking.userId]?.username || 'Unknown'}</p>
                      <p><strong>Phone Number:</strong> {userDetails[booking.userId]?.phoneNumber || 'Unknown'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default History;
