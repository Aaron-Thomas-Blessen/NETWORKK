import React, { useState, useEffect } from "react";
import { db, storage } from "../../Firebase/Firebase";
import { doc, collection, getDocs, getDoc, updateDoc, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Button } from "@material-tailwind/react";
import { ClipLoader } from "react-spinners";
import Navbar from "../../components/nav";
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useGig } from "../../Context/GigContext";
import Gigscomp from "../../components/Gigscomp";
import { FaUserEdit, FaEnvelope, FaPhone, FaHome, FaMapMarkerAlt } from "react-icons/fa";

const SellerProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [errors, setErrors] = useState({});
  const auth = getAuth();
  const navigate = useNavigate();
  const { selectGig } = useGig();

  const fadeIn = useSpring({
    opacity: loading ? 0 : 1,
    transform: loading ? "translateY(-20px)" : "translateY(0)",
    config: { duration: 500 },
  });

  const transitions = useTransition(editing, {
    from: { opacity: 0, transform: "translateY(-20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    config: { duration: 300 },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserData(userData);
          setFormData(userData);
          setProfilePicture(
            userData.profilePicture || "default_profile_picture_url"
          );
        }
        setLoading(false);
      }
    };

    const fetchGigs = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const gigsRef = collection(db, "services");
        const q = query(gigsRef, where("serviceProviderId", "==", currentUser.uid));
        const gigsSnap = await getDocs(q);
        const gigsData = gigsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched gigs data: ", gigsData);
        setGigs(gigsData);
      }
    };

    fetchUserData();
    fetchGigs();
  }, [auth]);

  const validateForm = () => {
    const errors = {};
    if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      errors.firstName = "First name should contain only alphabets";
    }
    if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      errors.lastName = "Last name should contain only alphabets";
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number should be a 10 digit number";
    }
    if (!/[a-zA-Z]/.test(formData.address)) {
      errors.address = "Address should contain at least one alphabet";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, formData);
        setUserData(formData);
        setEditing(false);
        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelClick = () => {
    setFormData(userData);
    setEditing(false);
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const currentUser = auth.currentUser;
      const oldProfilePicture = userData.profilePicture;

      const fileReference = storageRef(
        storage,
        `profilePicture/${currentUser.uid}/${file.name}`
      );
      setLoading(true);
      try {
        await uploadBytes(fileReference, file);
        const url = await getDownloadURL(fileReference);

        // Update Firestore with the new profile picture URL
        await updateDoc(doc(db, "users", currentUser.uid), {
          profilePicture: url,
        });

        // Set the new profile picture URL in the state
        setProfilePicture(url);

        // Delete the old profile picture from storage if it exists and is not the default picture
        if (
          oldProfilePicture &&
          oldProfilePicture !== "default_profile_picture_url"
        ) {
          const oldFileRef = storageRef(storage, oldProfilePicture);
          try {
            await deleteObject(oldFileRef);
            console.log("Old profile picture deleted successfully");
          } catch (error) {
            console.error("Error deleting old profile picture:", error);
          }
        }

        // Update userData state
        setUserData((prevUserData) => ({
          ...prevUserData,
          profilePicture: url,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handlePlaceSelected = (place) => {
    const address = place.formatted_address;
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    setFormData({ ...formData, locality: address, latitude, longitude });
  };

  const handleGigClick = (gig) => {
    selectGig(gig);
    navigate("/ProfileDashboard");
  };

  return (
    <div>
      <Navbar currentPage="sellerProfilePage" />
      {loading ? (
        <div className="mt-16 px-4 md:px-8 flex justify-center items-center h-screen">
          <ClipLoader size={100} color="#123abc" />
        </div>
      ) : (
        <animated.div style={fadeIn} className="container mx-auto mt-8 flex flex-wrap">
          <div className="mt-16 px-4 md:px-8 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
            <animated.div
              className="bg-white shadow-md container flex justify-center rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300"
              style={fadeIn}
            >
              <div className="">
                <div className="flex justify-center container">
                  <label
                    htmlFor="profilePictureInput"
                    className="cursor-pointer mb-4"
                  >
                    <div className="container mx-auto">
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="container mx-auto justify-center w-24 h-24 rounded-full mb-4"
                      />
                    </div>
                    <div className="text-blue-500">Change Profile Picture</div>
                  </label>
                  <input
                    id="profilePictureInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                  />
                </div>
                {transitions((style, item) =>
                  item ? (
                    <animated.div style={style}>
                      <div className="flex flex-col items-center">
                        <div className="mb-4 w-full px-2">
                          <label
                            htmlFor="localityInput"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Locality:
                          </label>
                          <Autocomplete
                            apiKey="AIzaSyDjLpn8fDYOJJ9Yj7PVsJzslIiVfk2iiHg"
                            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            options={{
                              componentRestrictions: { country: "in" },
                            }}
                            onPlaceSelected={handlePlaceSelected}
                          />
                        </div>
                        <div className="mb-4 w-full px-2">
                          <label
                            htmlFor="firstNameInput"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            First Name:
                          </label>
                          <input
                            type="text"
                            id="firstNameInput"
                            value={formData.firstName || ""}
                            name="firstName"
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-xs italic">
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div className="mb-4 w-full px-2">
                          <label
                            htmlFor="lastNameInput"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Last Name:
                          </label>
                          <input
                            type="text"
                            id="lastNameInput"
                            value={formData.lastName || ""}
                            name="lastName"
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-xs italic">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                        <div className="mb-4 w-full px-2">
                          <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            User Name:
                          </label>
                          <input
                            type="text"
                            id="username"
                            value={formData.username || ""}
                            name="username"
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        <div className="mb-4 w-full px-2">
                          <label
                            htmlFor="phoneNumberInput"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Phone Number:
                          </label>
                          <input
                            type="text"
                            id="phoneNumberInput"
                            value={formData.phoneNumber || ""}
                            name="phoneNumber"
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          {errors.phoneNumber && (
                            <p className="text-red-500 text-xs italic">
                              {errors.phoneNumber}
                            </p>
                          )}
                        </div>
                        <div className="mb-4 w-full px-2">
                          <label
                            htmlFor="addressInput"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Address:
                          </label>
                          <input
                            type="text"
                            id="addressInput"
                            value={formData.address || ""}
                            name="address"
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          {errors.address && (
                            <p className="text-red-500 text-xs italic">
                              {errors.address}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center mt-4">
                        <Button color="blue" onClick={handleSaveClick}>
                          Save
                        </Button>
                        <Button
                          color="red"
                          onClick={handleCancelClick}
                          className="ml-2"
                        >
                          Cancel
                        </Button>
                      </div>
                    </animated.div>
                  ) : (
                    <animated.div style={style}>
                      <p className="text-gray-700 text-lg flex items-center">
                        <FaUserEdit className="mr-2" />
                        <span className="font-bold">Username:</span>{" "}
                        {userData.username}
                      </p>
                      <p className="text-gray-700 text-lg flex items-center">
                        <FaEnvelope className="mr-2" />
                        <span className="font-bold">Email:</span>{" "}
                        {userData.email}
                      </p>
                      <p className="text-gray-700 text-lg flex items-center">
                        <FaUserEdit className="mr-2" />
                        <span className="font-bold">First Name:</span>{" "}
                        {userData.firstName}
                      </p>
                      <p className="text-gray-700 text-lg flex items-center">
                        <FaUserEdit className="mr-2" />
                        <span className="font-bold">Last Name:</span>{" "}
                        {userData.lastName}
                      </p>
                      <p className="text-gray-700 text-lg flex items-center">
                        <FaPhone className="mr-2" />
                        <span className="font-bold">Phone Number:</span>{" "}
                        {userData.phoneNumber}
                      </p>
                      <p className="text-gray-700 text-lg flex items-center">
                        <FaHome className="mr-2" />
                        <span className="font-bold">Address:</span>{" "}
                        {userData.address}
                      </p>
                      <p className="text-gray-700 text-lg flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        <span className="font-bold">Locality:</span>{" "}
                        {userData.locality}
                      </p>
                      <Button color="blue" onClick={handleEditClick}>
                        Edit
                      </Button>
                    </animated.div>
                  )
                )}
              </div>
            </animated.div>
          </div>
          <div className="mt-16 px-4 md:px-8 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
            <animated.div
              className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg hover:bg-gray-100 transition duration-300"
              style={fadeIn}
            >
              <div className="flex justify-center mb-4">
                <Link
                  to="/Gigcreate"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Service
                </Link>
              </div>
              <div>
                {gigs.length > 0 ? (
                  <Gigscomp gigs={gigs} onGigClick={handleGigClick} />
                ) : (
                  <p>No gigs available.</p>
                )}
              </div>
            </animated.div>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default SellerProfilePage;
