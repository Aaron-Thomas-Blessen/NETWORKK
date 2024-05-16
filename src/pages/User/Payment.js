import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../Firebase/Firebase";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import Navbar from "../../components/nav";
import ClipLoader from "react-spinners/ClipLoader";
import { useSpring, animated } from "react-spring";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, serviceProviderId, serviceId, bookingId } = location.state;

  const [upi, setUpi] = useState("");
  const [additionalPay, setAdditionalPay] = useState("");
  const [basePay, setBasePay] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBasePay = async () => {
      try {
        const serviceDoc = await getDoc(doc(db, "services", serviceId));
        if (serviceDoc.exists()) {
          setBasePay(serviceDoc.data().basePrice);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching base price:", error);
      }
    };

    fetchBasePay();
  }, [serviceId]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "payments"), {
        userId,
        serviceProviderId,
        serviceId,
        bookingId,
        basePay,
        additionalPay: Number(additionalPay),
        upi,
        timestamp: new Date(),
      });

      await updateDoc(doc(db, "bookings", bookingId), {
        bookingStatus: "Completed",
        paymentStatus: "Completed",
      });

      // Show success message
      toast.success("Payment successful!");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error processing payment:", error);
      // Show error message
      toast.error("Payment failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fade = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  const shadow = useSpring({
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    from: { boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" },
  });

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={150} color="#123abc" />
        </div>
      ) : (
        <animated.div
          style={fade}
          className="PaymentPage container mx-auto px-4 py-8"
        >
          <animated.div
            style={shadow}
            className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
          >
            <ToastContainer />
            <h2 className="text-3xl font-semibold mb-4">Payment</h2>
            <div className="mb-4">
              <label
                htmlFor="upi"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="basePay"
                className="block text-sm font-medium text-gray-700"
              >
                Base Pay:
              </label>
              <p id="basePay" className="mt-1 block text-lg font-semibold">
                Rs {basePay}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="additionalPay"
                className="block text-sm font-medium text-gray-700"
              >
                Additional Payment:
              </label>
                Rs <input
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
          </animated.div>
        </animated.div>
      )}
    </div>
  );
};

export default PaymentPage;
