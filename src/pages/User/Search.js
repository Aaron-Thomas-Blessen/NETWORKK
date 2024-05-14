import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import { useGig } from '../../Context/GigContext';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Navbar from '../../components/nav';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const { selectGig } = useGig();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const servicesRef = collection(db, 'services');
      const queryText = searchQuery.slice(0, 4);
      const q = query(
        servicesRef,
        where('status', '==', 'Accepted'),
        where('category', '>=', queryText),
        where('category', '<=', queryText + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      const services = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFilteredServices(services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center mb-8"> {/* Center the search bar */}
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 focus:outline-none focus:border-indigo-500 rounded-l-md px-4 py-2 w-full mr-2"
          />
          <button onClick={handleSearch} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-r-md">
            <MagnifyingGlassIcon className="h-5 w-5" /> {/* Using the search icon */}
          </button>
        </div>
        <ul className="grid grid-cols-3 gap-4 w-full">
          {filteredServices.map((service) => (
            <li key={service.id} className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-lg font-semibold">{service.title}</h2>
              <p className="text-gray-500">{service.category}</p>
              <Link to="/usergigsviews" onClick={() => selectGig(service)} className="text-indigo-600 hover:text-indigo-800">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default SearchBar;

