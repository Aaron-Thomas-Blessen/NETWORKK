import React, { useState, useEffect } from 'react';
import { useGig } from '../../Context/GigContext';
import { db } from '../../Firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from '../../components/nav';
import { useUser } from '../../Context/Context';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import ClipLoader from 'react-spinners/ClipLoader';

const Booking = () => {
  const { selectedGig } = useGig();
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState(location.state?.date || '');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedGig) {
      setBasePrice(selectedGig.basePrice);
    }
  }, [selectedGig]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const basePriceNumber = parseFloat(basePrice);
      // Add booking details to Firestore
      const bookingRef = await addDoc(collection(db, 'bookings'), {
        userId: user ? user.uid : null, // Use userId if user is logged in
        serviceProviderId: selectedGig.serviceProviderId,
        serviceId: selectedGig.id,
        date,
        address,
        description,
        basePayment: basePriceNumber,
        extraPayment: 0,
        paymentStatus: 'Pending',
        bookingStatus: 'Pending',
      });
      console.log('Booking added with ID: ', bookingRef.id);
      setLoading(false);
      navigate('/showBookings');
    } catch (e) {
      console.error('Error adding booking: ', e);
      setLoading(false);
    }
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle,
  });

  const confirmButtonAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.wobbly,
  });

  return (
    <div className="Booking min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-start mt-8">
        <animated.div style={formAnimation} className="w-full max-w-4xl p-8 border rounded-lg shadow-lg bg-white mx-4">
          <div className="Appointment">
            <div>
              <h1 className="text-3xl font-bold mb-8 text-center">Book Appointment</h1>
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input 
                type="date" 
                id="date"
                value={date} 
                readOnly // Make the input read-only
                className="block w-full p-3 border rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input 
                type="text" 
                id="address"
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Input the Exact Address" 
                className="block w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                id="description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Work Description" 
                className="block w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                rows="4"
              />
            </div>
          </div>
        </animated.div>
        <div className="w-full max-w-xs p-8 bg-gray-200 rounded-lg shadow-lg mx-4">
          <div className="confirm text-center">
            <h1 className="text-2xl font-bold mb-8">Amount Details</h1>
            <p className="text-3xl font-semibold text-gray-800 mb-8">Base Price: Rs.{basePrice}</p>
            <animated.div style={confirmButtonAnimation}>
              <button 
                onClick={handleConfirm} 
                disabled={loading}
                className="w-full bg-black text-white px-8 py-4 rounded hover:bg-gray-800 cursor-pointer"
              >
                {loading ? <ClipLoader size={20} color={"#fff"} loading={loading} /> : 'Confirm'}
              </button>
            </animated.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
