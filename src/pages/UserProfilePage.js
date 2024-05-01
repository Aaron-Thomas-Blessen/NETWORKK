import React from 'react';
import UserProfileForm from '../components/UserProfileForm'; // Adjusted import path for UserProfileForm


const UserProfilePage = () => {
  return (
    <div className="mx-auto max-w-md p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <UserProfileForm />
    </div>
  );
}

export default UserProfilePage;
