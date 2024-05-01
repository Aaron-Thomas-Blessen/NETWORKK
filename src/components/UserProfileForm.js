import React from 'react';

const UserProfileForm = () => {
  return (
    <div className="mx-auto max-w-md p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" name="username" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" id="firstName" name="firstName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" id="lastName" name="lastName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNum" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="text" id="phoneNum" name="phoneNum" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea id="address" name="address" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input type="file" id="profilePic" name="profilePic" className="mt-1 block w-full"/>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
      </form>
    </div>
  );
}

export default UserProfileForm;

