import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useSpring, animated } from 'react-spring';
import { db } from '../../Firebase/Firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Navbarsign from '../../components/navsign';

const AdminPaymentDetails = () => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'payments'),
      (snapshot) => {
        const paymentsData = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
        setPayments(paymentsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    );

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
        <h2 className="mt-20 px-4 md:px-8 text-2xl font-bold mb-5">Payment Details</h2>
        {payments.map((payment) => (
          <animated.div
            key={payment.id}
            className="p-5 mb-5 bg-white rounded-lg shadow-md hover:shadow-lg transform transition duration-300"
            style={hoverEffect.initial}
            onMouseEnter={(e) => (e.currentTarget.style = { ...hoverEffect.hover })}
            onMouseLeave={(e) => (e.currentTarget.style = { ...hoverEffect.initial })}
          >
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Additional Pay:</strong> {payment.additionalPay}</div>
              <div><strong>Base Pay:</strong> {payment.basePay}</div>
              <div><strong>Booking ID:</strong> {payment.bookingId}</div>
              <div><strong>Service ID:</strong> {payment.serviceId}</div>
              <div><strong>Service Provider ID:</strong> {payment.serviceProviderId}</div>
              <div><strong>Timestamp:</strong> {new Date(payment.timestamp.seconds * 1000).toLocaleString()}</div>
              <div><strong>UPI:</strong> {payment.upi}</div>
              <div><strong>User ID:</strong> {payment.userId}</div>
            </div>
          </animated.div>
        ))}
      </animated.div>
    </div>
  );
};

export default AdminPaymentDetails;
