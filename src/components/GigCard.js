import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const GigCard = ({ gig, onApprove, onReject }) => {
    const [expanded, setExpanded] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [ref, { height }] = useMeasure();

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleApprove = async () => {
        await onApprove(gig.id);
        window.location.reload();
    };

    const handleReject = async () => {
        await onReject(gig.id);
        window.location.reload();
    };

    const springProps = useSpring({
        height: expanded ? height : 0,
        opacity: expanded ? 1 : 0,
        overflow: 'hidden',
    });

    const renderButtons = () => {
        if (gig.status === 'Pending') {
            return (
                <div className="flex justify-center space-x-4 mt-4 pb-8">
                    <button onClick={handleApprove} className="bg-green-500 text-white px-4 py-2 rounded-lg">Approve</button>
                    <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded-lg">Reject</button>
                </div>
            );
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-blue-600">{gig.title}</h2> {/* Example of changing text color */}
                <button className="text-blue-500" onClick={toggleExpand}>
                    {expanded ? 'Collapse' : 'Expand'}
                </button>
            </div>
            <animated.div style={springProps}>
                <div ref={ref} className="mt-4">
                    <p className="text-gray-700"><span className="font-semibold">Category:</span> {gig.category}</p>
                    <p className="text-gray-700"><span className="font-semibold">Base Price:</span> {gig.basePrice}</p>
                    <p className="text-gray-700"><span className="font-semibold">Description:</span> {gig.description}</p>
                    <p className="text-gray-700"><span className="font-semibold">Phone Number:</span> {gig.phoneNumber}</p>
                    <p className="text-gray-700"><span className="font-semibold">Address:</span> {gig.address}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-800">PDF</h3>
                        <embed src={gig.gigPdf} type="application/pdf" width="100%" height="400px" className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-800">Demo Images</h3>
                        <div className="demo-images flex flex-wrap gap-2 mt-2">
                            {gig.demoPics.map((image, index) => (
                                <div key={index} className="w-24 h-24">
                                    <img
                                        src={image}
                                        alt={`Demo ${index}`}
                                        className="object-cover w-full h-full rounded cursor-pointer"
                                        onClick={() => {
                                            setPhotoIndex(index);
                                            setIsLightboxOpen(true);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        {isLightboxOpen && (
                            <Lightbox
                                open={isLightboxOpen}
                                close={() => setIsLightboxOpen(false)}
                                slides={gig.demoPics.map((src) => ({ src }))}
                                currentIndex={photoIndex}
                                on={{
                                    next: () => setPhotoIndex((photoIndex + 1) % gig.demoPics.length),
                                    prev: () => setPhotoIndex((photoIndex - 1 + gig.demoPics.length) % gig.demoPics.length),
                                }}
                            />
                        )}
                    </div>
                    {renderButtons()}
                </div>
            </animated.div>
        </div>
    );
};

export default GigCard;
