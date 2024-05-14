import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../Firebase/Firebase';
import { doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import Navbar from '../../components/nav';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, serviceProviderId, serviceId, bookingId } = location.state;

  const [upi, setUpi] = useState('');
  const [additionalPay, setAdditionalPay] = useState('');
  const [basePay, setBasePay] = useState(0);

  useEffect(() => {
    const fetchBasePay = async () => {
      try {
        const serviceDoc = await getDoc(doc(db, 'services', serviceId));
        if (serviceDoc.exists()) {
          setBasePay(serviceDoc.data().basePrice);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching base price:', error);
      }
    };

    fetchBasePay();
  }, [serviceId]);

  const handlePayment = async () => {
    try {
      // Add payment document to the payments collection
      await addDoc(collection(db, 'payments'), {
        userId,
        serviceProviderId,
        serviceId,
        bookingId,
        basePay,
        additionalPay: Number(additionalPay),
        upi,
        timestamp: new Date(),
      });

      // Update the booking status to 'Completed' and payment status to 'Completed'
      await updateDoc(doc(db, 'bookings', bookingId), {
        bookingStatus: 'Completed',
        paymentStatus: 'Completed',
      });

      // Navigate back to home page
      navigate('/');
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="PaymentPage">
      <Navbar />
      <h2>Payment</h2>
      <div>
        <label>
          UPI ID:
          <input type="text" value={upi} onChange={(e) => setUpi(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Base Pay: {basePay}
        </label>
      </div>
      <div>
        <label>
          Additional Payment:
          <input
            type="number"
            value={additionalPay}
            onChange={(e) => setAdditionalPay(e.target.value)}
            placeholder="Enter additional payment"
          />
        </label>
      </div>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default PaymentPage;
