import React, { useEffect, useState } from "react";
import { useGig } from "../../Context/GigContext";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Navbar from "../../components/nav";
import Image from "../../images/carpenter.jpg";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

const UsergigsViews = () => {
  const { selectedGig } = useGig();
  const [gigPdfUrl, setGigPdfUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      const storage = getStorage();
      if (!selectedGig) {
        console.log("Selected gig not set.");
        return;
      }

      console.log("Selected gig:", selectedGig);
      const userRef = collection(db, "users");
      const q = query(userRef, where("uid", "==", selectedGig.serviceProviderId));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const gigs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(gigs);

      // Fetch gig PDF URL
      const gigPdfRef = ref(storage, `${selectedGig.gigPdf}`);
      const gigPdfUrl = await getDownloadURL(gigPdfRef);
      console.log("Gig PDF URL:", gigPdfUrl);
      setGigPdfUrl(gigPdfUrl);
    };

    fetchUrls();
  }, [selectedGig]);

  const handleBookNow = () => {
    // Navigate to the booking page with service details
    navigate("/booking", { state: selectedGig });
  };

  if (!selectedGig) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8 flex  ">
        {/* Left Side - 3/5th space */}
        <div className="md:w-3/5">
          <div className="w-full  p-6">
            {/* Gig Details Section */}
            <div className="mb-8">
              <br></br>
              <h1 className="text-2xl font-bold mb-4">{selectedGig.title}</h1>
              <p className="text-gray-600 mb-2">
                Category: {selectedGig.category}
              </p>
              <p className="text-gray-600 mb-2 ">
                Description: {selectedGig.description}
              </p>
            </div>
            {/* Display Carpenter Image */}
            <img
              src={Image}
              alt="Carpenter"
              className="w-full mb-4 rounded-lg"
            />
          </div>
        </div>

        {/* Right Side - 2/5th space */}
        <div className="w-full md:w-2/5 ">
          <div className="max-w-md w-full p-6">
            {/* Gig Price Section */}
            <div className="text-xl bg-white rounded-lg shadow-md font-semibold mb-6 text-center py-8">
              <h1 className="mb-8">Base Price:</h1>
              <h2> Rs.{selectedGig.basePrice} /-</h2>
            </div>

            {/* Button to book now */}
            <button
              onClick={handleBookNow}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded"
            >
              Book Now
            </button>

            {/* Gig Contact Section */}
            <div className="bg-white rounded-lg shadow-md py-4">
              <div className=" py-5 text-center">
                <h1 className="mb-8 font-bold">Contact Me</h1>
                {/* <p>First Name: {userData.firstName}</p> */}
                <p className="text-gray-600 mb-4">
                  Address: {selectedGig.address}
                </p>
                <p className="text-gray-600 mb-4">
                  Phone Number: {selectedGig.phoneNumber}
                </p>
                <p className="text-gray-600 ">Email: {selectedGig.email}</p>
              </div>

              {/* Gig PDF Section */}

              <div className=" text-center mb-4">
                <h2 className="text-xl font-semibold mb-4">
                  Police Clearance Certificate
                </h2>
                <a
                  href={gigPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="text-blue-500 hover:text-blue-700 mb-4"
                >
                  Download PCC PDF
                </a>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsergigsViews;
