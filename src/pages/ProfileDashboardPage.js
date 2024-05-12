import React from 'react';
import Navbar from '../components/nav';


  const memberSince = '2024';
  const totalIncome = '$2597.00';
  const totalJobs = '7';
  const networkRanking = '4.8';
  const workData = {
    'Carpentry': [5, 10, 7, 11, 8],
    'Plumbing': [7, 14, 11, 8, 5],
    'Wiring': [6, 12, 14, 9, 10],
    'Masonry': [8, 6, 13, 10, 8]
  };
  
  const recentCustomers = [
    { name: 'Batman', orderDate: '19 May, 2024', orderId: '0001', phoneNumber: '251-631-5362', location: 'Kottayam', registered: 'Yes' },
    { name: 'Superman', orderDate: '16 May, 2024', orderId: '0002', phoneNumber: '171-536-1212', location: 'Ernakulam', registered: 'No' },
    // ... other customers ...
  ];
  
  const colors = ['rgba(75,192,192,0.4)', 'rgba(192,75,192,0.4)', 'rgba(192,192,75,0.4)', 'rgba(75,75,192,0.4)'];
  
  const Dashboard = () => (
    <div className="flex-1 p-10">
      <h1 className="text-3xl font-bold mb-6">Welcome Alan!</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <p className="text-sm text-gray-600">Member Since</p>
          <p className="text-xl font-bold">{memberSince}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <p className="text-sm text-gray-600">Total Income</p>
          <p className="text-xl font-bold">{totalIncome}</p>
        </div>
        {/* ... other data points ... */}
      </div>
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        {/* Work Data Table */}
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold">Work Data</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Month</th>
                {Object.keys(workData).map((job, index) => (
                  <th key={index} className="px-4 py-2">{job}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4].map((month, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{['Jan', 'Feb', 'Mar', 'Apr', 'May'][month]}</td>
                  {Object.keys(workData).map((job, index) => (
                    <td key={index} className="border px-4 py-2">{workData[job][month]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        {/* Recent Customers Table */}
        <div>
          <h2 className="text-1xl font-bold mb-2">Recent Customers</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Registered</th>
              </tr>
            </thead>
            <tbody>
              {recentCustomers.map((customer, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{customer.name}</td>
                  <td className="border px-4 py-2">{customer.orderDate}</td>
                  <td className="border px-4 py-2">{customer.orderId}</td>
                  <td className="border px-4 py-2">{customer.phoneNumber}</td>
                  <td className="border px-4 py-2">{customer.location}</td>
                  <td className="border px-4 py-2">{customer.registered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  const ProfileDashboardPage = () => {
    return(
      <div>
        <Navbar />
        <div className="flex-1 flex">
          <Dashboard />
        </div>
      </div>
  );
}

export default ProfileDashboardPage;
