import React from 'react';

const Gigscomp = ({ gigs, onGigClick }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Accepted':
        return 'text-green-700';
      case 'Rejected':
        return 'text-red-700';
      case 'Pending':
        return 'text-yellow-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div>
      <div className="container mx-auto mt-8"> 
        <div className="grid grid-cols-3 gap-4">
          {gigs.map(gig => (
            <div key={gig.id} onClick={() => onGigClick(gig)} className="p-4 border border-gray-300 rounded-lg mb-4 hover:shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer">
              <h2 className="text-xl font-semibold" >{gig.title}</h2>
              <p>
                <span className="text-black">Gig Status: </span>
                <span className={getStatusStyle(gig.status)}>{gig.status}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigscomp;
