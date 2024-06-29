import React, { useState, useEffect } from 'react';
import { useGig } from '../../Context/GigContext';
import { db } from '../../Firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from '../../components/nav';
import { useUser } from '../../Context/Context';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaCalendarAlt, FaMapMarkerAlt, FaFileAlt } from 'react-icons/fa';

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedGig) {
      setBasePrice(selectedGig.basePrice);
    }
  }, [selectedGig]);

  const validateFields = () => {
    const newErrors = {};
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async () => {
    if (!validateFields()) {
      return;
    }

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
    <div className="Booking min-h-screen">
      <Navbar />
      <div className="mt-24 px-4 md:px-8 flex flex-col md:flex-row justify-center items-start gap-8">
        <animated.div style={formAnimation} className="w-full max-w-4xl p-4 md:p-8 border rounded-lg shadow-lg bg-white mb-4 md:mb-0">
          <div className="Appointment">
            <div>
              <h1 className="text-3xl font-bold mb-4 md:mb-8 text-center">Book Appointment</h1>
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendarAlt className="inline mr-2" /> Date
              </label>
              <input 
                type="date" 
                id="date"
                value={date} 
                readOnly // Make the input read-only
                className="block w-full p-3 border rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline mr-2" /> Address
              </label>
              <input 
                type="text" 
                id="address"
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Input the Exact Address" 
                className="block w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                <FaFileAlt className="inline mr-2" /> Description
              </label>
              <textarea 
                id="description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Work Description" 
                className="block w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                rows="4"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </div>
        </animated.div>
        <animated.div style={formAnimation} className="w-full max-w-xs p-4 md:p-8 bg-gray-200 rounded-lg shadow-lg">
          <div className="confirm text-center">
            <h1 className="text-2xl font-bold mb-4 md:mb-8">Amount Details</h1>
            <p className="text-3xl font-semibold text-gray-800 mb-4 md:mb-8">Base Price: Rs.{basePrice}</p>
            <animated.div style={confirmButtonAnimation}>
              <button 
                onClick={handleConfirm} 
                disabled={loading}
                className="w-full bg-black text-white px-4 py-2 md:px-8 md:py-4 rounded hover:bg-gray-800 cursor-pointer"
              >
                {loading ? <ClipLoader size={20} color={"#fff"} loading={loading} /> : 'Confirm'}
              </button>
            </animated.div>
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default Booking;
