import React, { useState, useEffect } from "react";
import { db, storage } from "../../Firebase/Firebase"; 
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { Button } from "@material-tailwind/react";
import { ClipLoader } from "react-spinners";
import Navbar from "../../components/nav";

const SellerProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const auth = getAuth();

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
          setProfilePicture(userData.profilePicture || "default_profile_picture_url");
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
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
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReference = storageRef(storage, `${auth.currentUser.uid}/profilePicture/${file.name}`);
      setLoading(true);
      try {
        await uploadBytes(fileReference, file);
        const url = await getDownloadURL(fileReference);
        setProfilePicture(url);
        await updateDoc(doc(db, "users", auth.currentUser.uid), { profilePicture: url });
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

  if (loading) {
    return <ClipLoader color="#00BFFF" loading={loading} size={150} />;
  }

  return (
    <div>
      <Navbar currentPage="sellerProfilePage"/>
      <div className="container mx-auto mt-8">
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
          <label htmlFor="profilePictureInput" className="cursor-pointer mb-4">
            <img src={profilePicture} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
            <div className="text-blue-500">Change Profile Picture</div>
          </label>
          <input
            id="profilePictureInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
          {editing ? (
            <>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 px-2">
                  <label htmlFor="firstNameInput" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                  <input type="text" id="firstNameInput" value={formData.firstName || ''} name="firstName" onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 px-2">
                  <label htmlFor="lastNameInput" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                  <input type="text" id="lastNameInput" value={formData.lastName || ''} name="lastName" onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 px-2">
                  <label htmlFor="phoneNumberInput" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                  <input type="text" id="phoneNumberInput" value={formData.phoneNumber || ''} name="phoneNumber" onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 px-2">
                  <label htmlFor="addressInput" className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                  <input type="text" id="addressInput" value={formData.address || ''} name="address" onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
              </div>
              <Button color="blue" onClick={handleSaveClick}>Save</Button>
            </>
          ) : (
            <>
              <p>Username: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <p>First Name: {userData.firstName}</p>
              <p>Last Name: {userData.lastName}</p>
              <p>Phone Number: {userData.phoneNumber}</p>
              <p>Address: {userData.address}</p>
              <Button color="blue" onClick={handleEditClick}>Edit</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfilePage;
