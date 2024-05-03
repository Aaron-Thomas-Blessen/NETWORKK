import React from "react";
import { SlHeart, SlShare, SlStar } from "react-icons/sl";
import Carousel from "../components/carousel";
import MyCalendar from "../components/calender";

const Images = [
  "https://picsum.photos/1980/1080",
  "https://picsum.photos/1980/1080",
  "https://picsum.photos/1980/1080",
  // Just some demo images for carousel
];

const ProfileSection = ({ name, rating }) => {
  return (
    <div className="flex items-start flex-col">
      <div className="flex flex-row">
        <img
          src="./images/user.png"
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <div className="flex items-center mt-4">
            {Array.from({ length: rating }).map((_, index) => (
              <SlStar key={index} className="h-5 w-5 text-yellow-500" />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-auto mt-10 ">
        <Carousel images={Images} />
      </div>
      <div className="mt-12">
        <h2 className="font-bold text-lg ">
          What people love about this freelancer
        </h2>
        <p className="mt-4 w-3/4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};

const PriceBox = ({ minCharge }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center">
      <h3 className="text-lg font-semibold">Minimum Charge</h3>
      <p className="font-bold">Rs.{minCharge} /-</p>
    </div>
  );
};

const ContactBox = ({ phno, email }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center">
      <h3 className="text-lg font-semibold mb-5">Contact</h3>
      <p className="font-medium">{phno}</p>
      <p className="font-medium">{email}</p>
    </div>
  );
};

const ReviewBox = ({ name, rating, review }) => {
  return (
    <div>
      
    </div>
  )
}

const ProfileLayout = () => {
  return (
    <div className="flex px-4">
      <div className="w-4/6 pr-4 mr-2">
        <ProfileSection name="Gordon" rating={4} />
      </div>
      <div className="w-2/6">
        <PriceBox minCharge={100} />
        <button className="w-full mt-5 bg-black text-white py-3 rounded-lg shadow-lg hover:bg-white hover:text-black focus:outline-none">
          Hire me
        </button>
        <div className=" mt-9 w-full">
          <MyCalendar />
        </div>
        <div className="mt-7">
          <ContactBox phno="+00-123456789" email="username@something.com" />
        </div>
      </div>
    </div>
  );
};

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
        <div className="flex items-center space-x-4 m-5">
          <SlHeart className="h-6 w-6 mr-5 text-gray-400 cursor-pointer" />
          <SlShare className="h-6 w-6 text-gray-400 cursor-pointer" />
        </div>
      </div>
      <div>
        <ProfileLayout />
      </div>
      <div>

      </div>
    </>
  );
};

export default UserGigView;
