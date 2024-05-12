import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import { useGig } from '../../Context/GigContext';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const { selectGig } = useGig();

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
      <input
        type="text"
        placeholder="Search services..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        <div className="grid grid-cols-3 gap-4">
            {filteredServices.map((service) => (
            <div key={service.id} className="bg-white p-4 shadow-md rounded-md">
                <h2>{service.title}</h2>
                <p>{service.category}</p>
                <Link to={ '/usergigsviews' } onClick={() => selectGig(service)} >
                    View Details
                </Link>
            </div>
            ))}
        </div>
      </ul>
    </div>
  );
};

export default SearchBar;
