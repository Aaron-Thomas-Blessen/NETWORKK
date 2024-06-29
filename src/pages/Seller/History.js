import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase/Firebase';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import Collapsible from '@edonec/collapsible';
import { useUser } from '../../Context/Context';
import Navbar from '../../components/nav';
import { useSpring, animated } from 'react-spring';
import { ClipLoader } from 'react-spinners';

const History = () => {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [serviceTitles, setServiceTitles] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceTitles = async (serviceIds) => {
      try {
        const titles = {};
        for (const id of serviceIds) {
          const serviceDoc = await getDoc(doc(db, 'services', id));
          if (serviceDoc.exists()) {
            titles[id] = serviceDoc.data().title;
          } else {
            titles[id] = `Service ID: ${id}`;
          }
        }
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
            details[id] = { userName: 'Unknown', phoneNumber: 'Unknown' };
          }
        }
        setUserDetails(details);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const initializeData = async (bookingsData) => {
      if (bookingsData.length > 0) {
        const serviceIds = [...new Set(bookingsData.map(booking => booking.serviceId))];
        const userIds = [...new Set(bookingsData.map(booking => booking.userId))];
        await fetchServiceTitles(serviceIds);
        await fetchUserDetails(userIds);
      }
      setLoading(false);
    };

    if (user) {
      const q = query(
        collection(db, 'bookings'),
        where('serviceProviderId', '==', user.uid),
        where('bookingStatus', '==', 'Completed')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const bookingsData = [];
        querySnapshot.forEach(doc => {
          bookingsData.push(doc.data());
        });
        bookingsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBookings(bookingsData);
        initializeData(bookingsData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const fadeIn = useSpring({
    opacity: loading ? 0 : 1,
    transform: loading ? 'translateY(-20px)' : 'translateY(0)',
    delay: 200
  });

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
        {loading ? (
          <div className="mt-16 px-4 md:px-8 flex justify-center items-center">
            <ClipLoader size={100} color="#3498db" />
          </div>
        ) : (
          <animated.div style={fadeIn}>
            {Object.keys(groupedBookings).length === 0 ? (
              <p className="mt-16 px-4 md:px-8 text-center text-gray-500">No Completed Bookings</p>
            ) : (
              Object.keys(groupedBookings).map(serviceId => (
                <div key={serviceId} className="mt-8 px-4 md:px-8 p-2 bg-white rounded-2xl mb-4 shadow-lg">
                  <Collapsible open header={serviceTitles[serviceId]}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pt-4 pb-2 text-sm text-gray-500">
                      {groupedBookings[serviceId].map(booking => (
                        <div key={booking.reviewId} className="bg-white p-4 shadow-md rounded-md mb-4">
                          <div>
                            <p><strong>Address:</strong> {booking.address}</p>
                            <p><strong>Date:</strong> {booking.date}</p>
                            <p><strong>Base Payment:</strong> Rs {booking.basePayment}</p>
                            <p><strong>Extra Payment:</strong> Rs {booking.extraPayment}</p>
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
              ))
            )}
          </animated.div>
        )}
      </div>
    </div>
  );
};

export default History;
