import React from "react";
import UserProfileForm from "../components/UserProfileForm"; // Adjusted import path for UserProfileForm
import Navsign from "../components/navsign";

const UserProfilePage = () => {
  const Userprof = () => {
    return (
      <div className="mx-auto max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <UserProfileForm />
      </div>
    );
  };
  return (
    <div className="usertot">
      <Navsign />
      <Userprof />
    </div>
  );
};

export default UserProfilePage;
