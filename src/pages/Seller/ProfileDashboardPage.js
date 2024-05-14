import React from 'react';
import { useGig } from '../../Context/GigContext';
import Carousel from '../../components/carousel';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useUser } from '../../Context/Context';
import Navbar from "../../components/nav";

const ProfileDashboard = () => {
  const { selectedGig } = useGig();
  const { user } = useUser();
  const [demoPicsUrls, setDemoPicsUrls] = useState([]);
  const [gigPdfUrl, setGigPdfUrl] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      const storage = getStorage();

      // Fetch demo pics URLs
      const demoPicsUrls = selectedGig.demoPics;
      setDemoPicsUrls(demoPicsUrls);

      // Fetch gig PDF URL
      const gigPdfRef = ref(storage, `${selectedGig.gigPdf}`);
      const gigPdfUrl = await getDownloadURL(gigPdfRef);
      setGigPdfUrl(gigPdfUrl);
    };

    if (selectedGig) {
      fetchUrls();
    }
  }, [selectedGig]);

  if (!selectedGig) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar currentPage="ProfileDashboardPage" />
    
    <div className="container mx-auto px-4 py-8">
      
      <div className="max-w-4xl  mx-auto">
        <h1 className="text-3xl font-bold mb-4">{selectedGig.title}</h1>
        <p className="text-lg mb-4"><span className="font-semibold">Category:</span> {selectedGig.category}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Description:</span> {selectedGig.description}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Base Price:</span> Rs.{selectedGig.basePrice} /-</p>
        <p className="text-lg mb-4"><span className="font-semibold">Address:</span> {selectedGig.address}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Phone Number:</span> {selectedGig.phoneNumber}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Email:</span> {selectedGig.email}</p>
        <div className="mb-8">
          <h2 className=" font-semibold mb-4">Demo Pics</h2>
          <Carousel images={demoPicsUrls} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Gig PDF</h2>
          <a href={gigPdfUrl} target="_blank" rel="noreferrer" download className="text-blue-500 hover:underline">Download Gig PDF</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfileDashboard;


/*import React from 'react';
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
      </div>
      <div className="bg-white p-4 shadow rounded-lg mb-6">
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
*/
