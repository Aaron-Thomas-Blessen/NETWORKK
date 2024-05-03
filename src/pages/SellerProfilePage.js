import React from "react";
import SellerProfileForm from "../components/SellerProfileForm"; // Adjusted import path for SellerProfileForm
import Navsign from "../components/navsign";

const SellerProfilePage = () => {
  const Seller = () => {
    return (
      <div className="mx-auto max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Seller Profile</h2>
        <SellerProfileForm />
      </div>
    );
  };
  return (
    <div className="Gigcreate">
      <Navsign />
      <Seller />
    </div>
  );
};

export default SellerProfilePage;
