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
    <div>
  <Navbar />
    <div className="PaymentPage container mx-auto px-4 py-8">
      
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Payment</h2>
        <div className="mb-4">
          <label htmlFor="upi" className="block text-sm font-medium text-gray-700">
            UPI ID:
          </label>
          <input
            id="upi"
            type="text"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your UPI ID"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="basePay" className="block text-sm font-medium text-gray-700">
            Base Pay:
          </label>
          <p id="basePay" className="mt-1 block text-lg font-semibold">{basePay}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="additionalPay" className="block text-sm font-medium text-gray-700">
            Additional Payment:
          </label>
          <input
            id="additionalPay"
            type="number"
            value={additionalPay}
            onChange={(e) => setAdditionalPay(e.target.value)}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter additional payment amount"
          />
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Pay Now
        </button>
      </div>
    </div>
    </div>
  );
  
};

export default PaymentPage;
