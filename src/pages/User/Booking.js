import React, { useState } from 'react';
import { useGig } from '../../Context/GigContext';
import { db } from '../../Firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from '../../components/nav';
import { useUser } from '../../Context/Context';
import { Link } from 'react-router-dom';

const Booking = () => {
  const { selectedGig } = useGig();
  const { user } = useUser();
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [address, setAddress] = useState('');

  // Set basePrice when selectedGig is available
  useState(() => {
    if (selectedGig) {
      setBasePrice(selectedGig.basePrice);
    }
  }, [selectedGig]);

  const handleConfirm = async () => {
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
    } catch (e) {
      console.error('Error adding booking: ', e);
    }
  };

  return (
    <div className="Booking">
      <Navbar />
      <div className="flex justify-center items-center mt-8">
        <div className="w-3/5 h-3/5 p-8 border border-black rounded-lg mr-8 pb-4 border border-gray-400">
          <div className="Appointment">
            <div>
              <h1 className="text-2xl font-bold mb-8">Book Appointment</h1>
            </div>
            <div className="w-1/2 mb-4">
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} // Update the date state onChange
                placeholder="Choose Date" 
                className="mb-4 border border-black rounded p-2 w-full border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"
              />
            </div>
            <div className="w-1/2 mb-4 ">
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Input the Exact Address" className="mb-4 border border-black rounded p-2 w-full border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"></input>
            </div>
            <div className="w-1/2 h-48 mb-4">
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Work Description" className="mb-4 w-full h-full mb-4 border border-black rounded p-2 w-full border border-gray-400 rounded-l-md py-2 px-4 w-96 focus:outline-none focus:ring-1 focus:ring-slate-950"></textarea>
            </div>
          </div>
        </div>
        <div className="w-1/5 h-2/5 p-8 bg-gray-200 rounded-lg">
          <div className="confirm text-center">
            <h1 className="text-2xl font-bold mb-8 h-80">Amount Details</h1>
            <p>Base Price: Rs.{basePrice}</p>
            <Link to="/" onClick={handleConfirm}>
              <input 
                type="submit" 
                value="Confirm" 
                className="bg-black text-white px-8 py-4 rounded hover:bg-gray-800 cursor-pointer" 
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
