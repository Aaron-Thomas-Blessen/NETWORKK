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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto mb-8"> {/* Center the search bar */}
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-md border border-gray-300 focus:outline-none focus:border-indigo-500 rounded-l-md px-4 py-2 w-full"
            />
            <button onClick={handleSearch} className="absolute top-0 right-0 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-r-md">
              <MagnifyingGlassIcon className="h-5 w-5" /> {/* Using the search icon */}
            </button>
          </div>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <li key={service.id} className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-lg font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-500 mb-4">{service.category}</p>
              <Link to="/usergigsviews" onClick={() => selectGig(service)} className="text-indigo-600 hover:text-indigo-800 inline-block">
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
