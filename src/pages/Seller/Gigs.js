import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/nav';

const Gigs = () => {
  return (
    <div>
        <Navbar />
            <div className="container mx-auto mt-8">
            <div className="flex justify-end mb-4">
                <Link to="/Gigcreate" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Gig
                </Link>
            </div>
            {/* Add Gig cards or other content here */}
            </div>
    </div>
  );
};

export default Gigs;
