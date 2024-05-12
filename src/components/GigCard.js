import React, { useState } from 'react';

const GigCard = ({ gig, onApprove, onReject }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    const renderButtons = () =>{
        if (gig.status == "Pending"){
            return(
            <>
                <button onClick={onApprove} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">Approve</button>
                <button onClick={onReject} className="bg-red-500 text-white px-4 py-2 rounded-lg">Reject</button>
            </>
            )
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{gig.title}</h2>
                <button className="text-blue-500" onClick={toggleExpand}>
                    {expanded ? 'Collapse' : 'Expand'}
                </button>
            </div>
            {expanded && (
                <div className="mt-4">
                    <p><span className="font-semibold">Category:</span> {gig.category}</p>
                    <p><span className="font-semibold">Base Price:</span> {gig.basePrice}</p>
                    <p><span className="font-semibold">Description:</span> {gig.description}</p>
                    <p><span className="font-semibold">Phone Number:</span> {gig.phoneNumber}</p>
                    <p><span className="font-semibold">Address:</span> {gig.address}</p>
                    <div>
                        <h3>PDF</h3>
                        <embed src={gig.gigPdf} type="application/pdf" width="100%" height="600px" />
                    </div>
                    <div>
                        <h3>Demo Images</h3>
                        <div className="demo-images">
                            {gig.demoPics.map((image, index) => (
                                <img key={index} src={image} alt={`Demo ${index}`} />
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        { renderButtons() }
                    </div>
                </div>
            )}
        </div>
    );
};

export default GigCard;
