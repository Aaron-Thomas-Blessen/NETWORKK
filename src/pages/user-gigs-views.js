import React from 'react';
import { SlHeart, SlShare } from "react-icons/sl";




const UserGigView = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-gray-200 p-4">
        <div className="flex items-center">
          <img src="path_to_your_logo" alt="Logo" className="h-10 mr-2" />
        </div>
      </div>
      <div className="flex justify-between items-center  p-4">
        <div></div> {/* Left side blank */}
        <div className="flex items-center space-x-4">
          <SlHeart className="h-6 w-6 text-gray-400 cursor-pointer" />
          <SlShare className="h-6 w-6 text-gray-400 cursor-pointer" />
        </div>
      </div>
      <div></div>
    </>
  );
};

export default UserGigView;